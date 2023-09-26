import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeroDisplayComponent } from './post-hero-display.component';

describe('PostHeroDisplayComponent', () => {
  let component: PostHeroDisplayComponent;
  let fixture: ComponentFixture<PostHeroDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostHeroDisplayComponent]
    });
    fixture = TestBed.createComponent(PostHeroDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
