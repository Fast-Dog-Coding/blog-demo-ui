import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFilteredComponent } from './posts-filtered.component';

describe('PostsFilteredComponent', () => {
  let component: PostsFilteredComponent;
  let fixture: ComponentFixture<PostsFilteredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsFilteredComponent]
    });
    fixture = TestBed.createComponent(PostsFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
