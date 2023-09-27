import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFilteredDisplayComponent } from './post-filtered-display.component';

describe('PostsFilteredDisplayComponent', () => {
  let component: PostFilteredDisplayComponent;
  let fixture: ComponentFixture<PostFilteredDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostFilteredDisplayComponent]
    });
    fixture = TestBed.createComponent(PostFilteredDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
