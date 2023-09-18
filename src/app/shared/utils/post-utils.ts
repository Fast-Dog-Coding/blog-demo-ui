import { forkJoin, OperatorFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Post } from '../../models/post';
import { PostWithAuthor } from '../../models/post-with-author';
import { UsersStore } from '../../store/users.store';

/**
 * Processes an array of posts and returns an array of PostWithAuthor objects.
 *
 * @param {UsersStore} usersStore - The UsersStore object used to get user information.
 * @param {number} [numberToReturn=1] - The number of posts to return. Default is 1.
 * @returns {OperatorFunction<Post[], PostWithAuthor[]>} - The RxJS operator function that transforms the input Observable of posts into an Observable of PostWithAuthor objects.
 */
export function processPosts(usersStore: UsersStore, numberToReturn: number = 1): OperatorFunction<Post[], PostWithAuthor[]> {
  return posts$ => posts$
    .pipe(
      // Sort posts, newest on top
      map(posts => posts
        .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
      ),

      // Get the most recent one(s)
      map(sortedPosts => sortedPosts.slice(0, numberToReturn)),

      // For each post, get the author
      switchMap(posts =>
        forkJoin(
          posts.map(post =>
            usersStore.getUserById(post.authorId)
              .pipe(
                map(author => ({ post, author }))
              )
          )
        )
      )
    );
}
