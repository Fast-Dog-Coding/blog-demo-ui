import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from './post.service';
import { environment } from '@environments/environment';
import { HttpRequestState, loadedState, loadingState } from '../models/http-request-state';
import { Categories, Post, PromotionLevels } from '../models/post';
import { ArchiveLink } from '../models/archive-link';

const mockPost: Post = {
  id: 1,
  categories: [ Categories.NodeJs ],
  promotion: PromotionLevels.None,
  title: 'Mock Post',
  lede: 'This is a mock post',
  imageUrl: '',
  imageUrlCredit: '',
  bodyHtml: '<div></div>',
  authorId: 1,
  publishedDate: '2023-09-01T12:00:00Z'
};
const mockPosts = [ mockPost ];
const mockCategories = Object.values(Categories);
const mockArchiveLinks = [
  { 'date': '2023-8', 'label': 'August 2023' },
  { 'date': '2023-9', 'label': 'September 2023' }
];

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ PostService ]
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifying that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all posts', (done) => {
    const mockPostsRequest: HttpRequestState<Post[]> = loadedState(mockPosts);
    const emissions: HttpRequestState<Post[]>[] = [];

    service.loadAllPosts().subscribe({
      next: postsRequest => {
        emissions.push(postsRequest);
      },
      complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        expect(emissions[1]).toEqual(jasmine.objectContaining(mockPostsRequest));
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should retrieve filtered posts', (done ) => {
    const mockPostsRequest: HttpRequestState<Post[]> = loadedState(mockPosts);
    const query = { category: Categories.NodeJs };
    const emissions: HttpRequestState<Post[]>[] = [];

    service.loadFilteredPosts(query).subscribe({
      next: postsRequest => {
        emissions.push(postsRequest);
      },
      complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        expect(emissions[1]).toEqual(jasmine.objectContaining(mockPostsRequest));
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts?category=${Categories.NodeJs}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should retrieve post by id', (done) => {
    const mockPostRequest: HttpRequestState<Post> = loadedState(mockPost);
    const postId: number = 1;
    const emissions: HttpRequestState<Post>[] = [];

    service.getPostById(postId).subscribe({
      next: postRequest => {
        emissions.push(postRequest);
      },
        complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        expect(emissions[1]).toEqual(jasmine.objectContaining(mockPostRequest));
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should retrieve an error using a missing id', (done) => {
    const postId: number = -1;
    const mockMissingPostError = new HttpErrorResponse(
      {
        url: `${environment.apiUrl}/posts/${postId}`,
        error: '',
        status: 404,
        statusText: 'not found'
      }
    );
    const emissions: HttpRequestState<Post>[] = [];

    service.getPostById(postId).subscribe({
      next: postRequest => {
        emissions.push(postRequest);
      },
      complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        const reqError = emissions[1].error;
        expect(reqError).toBeInstanceOf(HttpErrorResponse);

        if (reqError instanceof HttpErrorResponse) {
          expect(reqError).toEqual(jasmine.objectContaining(mockMissingPostError));
        }
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush('', mockMissingPostError);
  });

  it('should retrieve post categories', (done) => {
    const mockCategoriesRequest: HttpRequestState<string[]> = loadedState(mockCategories);
    const emissions: HttpRequestState<string[]>[] = [];

    service.getPostCategories().subscribe({
      next: postCategoriesRequest => {
        emissions.push(postCategoriesRequest);
      },
      complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        expect(emissions[1]).toEqual(jasmine.objectContaining(mockCategoriesRequest));
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should retrieve archive links', (done) => {
    const archiveLinksRequest: HttpRequestState<ArchiveLink[]> = loadedState(mockArchiveLinks);
    const emissions: HttpRequestState<ArchiveLink[]>[] = [];

    service.loadArchiveLinks().subscribe({
      next: archiveLinksRequest => {
        emissions.push(archiveLinksRequest);
      },
      complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        expect(emissions[1]).toEqual(jasmine.objectContaining(archiveLinksRequest));
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/posts/archive-links`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArchiveLinks);
  });
});
