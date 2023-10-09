import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '@environments/environment';
import { User } from '../models/user';
import { HttpRequestState, loadedState, loadingState } from '../models/http-request-state';
import { HttpErrorResponse } from '@angular/common/http';

const mockUser: User = {
  id: 1,
  firstName: 'First',
  lastName: 'Last',
  profileUrl: '',
  profileImageUrl: ''
};
const mockUsers = [ mockUser ];

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserService ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifying that no requests are outstanding.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', (done) => {
    const mockUsersRequest: HttpRequestState<User[]> = loadedState(mockUsers);
    const emissions: HttpRequestState<User[]>[] = [];

    service.loadAllUsers().subscribe({
      next: usersRequest => {
        emissions.push(usersRequest);
      },
      complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        expect(emissions[1]).toEqual(jasmine.objectContaining(mockUsersRequest));
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch a user by id', (done) => {
    const mockUserRequest: HttpRequestState<User> = loadedState(mockUser);
    const userId: number = 1;
    const emissions: HttpRequestState<User>[] = [];

    service.getUserById(userId).subscribe({
      next: userRequest => {
        emissions.push(userRequest);
      },
      complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        expect(emissions[1]).toEqual(jasmine.objectContaining(mockUserRequest));
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should retrieve an error using a missing id', (done) => {
    const userId: number = -1;
    const mockMissingUserError = new HttpErrorResponse(
      {
        url: `${environment.apiUrl}/users/${userId}`,
        error: '',
        status: 404,
        statusText: 'not found'
      }
    );
    const emissions: HttpRequestState<User>[] = [];

    service.getUserById(userId).subscribe({
      next: userRequest => {
        emissions.push(userRequest);
      },
      complete: () => {
        expect(emissions[0]).toEqual(jasmine.objectContaining(loadingState()));
        const reqError = emissions[1].error;
        expect(reqError).toBeInstanceOf(HttpErrorResponse);

        if (reqError instanceof HttpErrorResponse) {
          expect(reqError).toEqual(jasmine.objectContaining(mockMissingUserError));
        }
        done();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush('', mockMissingUserError);
  });
});
