import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFeatureDisplayComponent } from './post-feature-display.component';

describe('PostFeatureDisplayComponent', () => {
  let component: PostFeatureDisplayComponent;
  let fixture: ComponentFixture<PostFeatureDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostFeatureDisplayComponent]
    });
    fixture = TestBed.createComponent(PostFeatureDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
