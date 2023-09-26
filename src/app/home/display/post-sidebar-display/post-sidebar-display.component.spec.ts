import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSidebarDisplayComponent } from './post-sidebar-display.component';

describe('PostSidebarDisplayComponent', () => {
  let component: PostSidebarDisplayComponent;
  let fixture: ComponentFixture<PostSidebarDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSidebarDisplayComponent]
    });
    fixture = TestBed.createComponent(PostSidebarDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
