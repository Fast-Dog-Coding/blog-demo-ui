import { catchError, forkJoin, Observable, of, OperatorFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostWithAuthor } from '../../models/post-with-author';
import { UserService } from '../../services/user.service';
import { HttpRequestState } from '../../models/http-request-state';

/**
 * Combines an array of posts with an array of user results to create an array of posts with their respective authors.
 *
 * @param {Post[]} posts - An array of posts.
 * @param {HttpRequestState<User>[]} userResults - An array of user results.
 * @returns {PostWithAuthor[]} - An array of posts with their respective authors.
 */
function combinePostsAndAuthors(posts: Post[], userResults: HttpRequestState<User>[]): PostWithAuthor[] {
  return posts.map((post, index) => {
    const userResult = userResults[index];
    const author = userResult.value as User;
    return { post, author };
  });
}

/**
 * Formats the response by updating the value property of the HttpRequestState object with a new value.
 *
 * @param {HttpRequestState<any>} requestState - The original HttpRequestState object.
 * @param {PostWithAuthor} [newValue] - The new value to be assigned to the value property.
 * @return {HttpRequestState<any>} - The updated HttpRequestState object with the new value.
 */
function formatResponse<T, K>(requestState: HttpRequestState<T>, newValue?: K): HttpRequestState<K> {
  return { ...requestState, value: newValue };
}

/**
 * Retrieves the authors of the given posts from the users store.
 *
 * @param {UserService} usersStore - The store containing the user data.
 * @param {Post[]} posts - The posts to retrieve the authors for.
 * @return {Observable<HttpRequestState<User>[]>} - An observable that emits an array of HTTP request states for each author retrieval.
 */
function getAuthorsForPosts(usersStore: UserService, posts: Post[]): Observable<HttpRequestState<User>[]> {
  const getUserCalls: Observable<HttpRequestState<User>>[] = posts.map(post => usersStore.getUserById(post.authorId));
  return forkJoin(getUserCalls);
}

/**
 * Returns an array of posts sorted by their published date in descending order.
 *
 * @param {Post[] | undefined} posts - An array of post objects.
 * @param {number=} numberToReturn - The number of sorted posts to return. Defaults to all.
 * @returns {Post[]} - The sorted array of posts.
 */
function getPostsSortedByDate(posts: Post[] | undefined, numberToReturn?: number): Post[] {
  let sortedPosts: Post[] = [];

  if (Array.isArray(posts)) {
    sortedPosts = posts
      .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
      .slice(0, numberToReturn);
  }

  return sortedPosts;
}

/**
 * Processes the posts in the given request state, adding author information to each post.
 *
 * @param usersStore - The store containing the user information.
 * @param numberToReturn - Optional. The maximum number of posts to return. If not specified, all posts will be returned.
 * @returns An operator function that takes an `HttpRequestState<Post[]>` as input and emits an `HttpRequestState<PostWithAuthor[]>` with the processed posts.
 */
export function processPosts(usersStore: UserService, numberToReturn?: number): OperatorFunction<HttpRequestState<Post[]>, HttpRequestState<PostWithAuthor[]>> {
  return (requestState$) => requestState$
    .pipe(
      switchMap(postsRequestState => {
        const posts = getPostsSortedByDate(postsRequestState.value, numberToReturn);
        if (posts.length > 0) {
          return getAuthorsForPosts(usersStore, posts)
            .pipe(
              map((userResults) => {
                const postsWithAuthors = combinePostsAndAuthors(posts, userResults);
                return { ...postsRequestState, value: postsWithAuthors };
              })
            );
        }
        return of(formatResponse<Post[], PostWithAuthor[]>(postsRequestState))
      })
    );
}

/**
 * Processes a post by retrieving the post author's information and updating the response value.
 *
 * @param {UserService} usersStore - The UserService instance used to retrieve user information.
 * @return {OperatorFunction<HttpRequestState<Post>, HttpRequestState<PostWithAuthor>>} - The operator function that processes the post.
 */
export function processPost(usersStore: UserService): OperatorFunction<HttpRequestState<Post>, HttpRequestState<PostWithAuthor>> {
  return requestState$ => requestState$
    .pipe(
      switchMap((postRequestState: HttpRequestState<Post>) => {
        const post = postRequestState.value;
        if (post) {
          // We got a Post
          return usersStore.getUserById(post.authorId)
            .pipe(
              switchMap((userRequestState: HttpRequestState<User>) => {
                const author = userRequestState.value;
                if (author) {
                  // We got the Post author (User)
                  const newValue: PostWithAuthor = { post, author };
                  return of(formatResponse<User, PostWithAuthor>(userRequestState, newValue));
                }
                // No User value
                return of(formatResponse<User, PostWithAuthor>(userRequestState));
              }),
              catchError(() => of(formatResponse<Post, PostWithAuthor>(postRequestState)))
            );
        }
        // No Post value
        return of(formatResponse<Post, PostWithAuthor>(postRequestState));
      }),
      catchError((error) => of(formatResponse<Post, PostWithAuthor>({ isLoading: false, error })))
    );
}
