import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingLandingComponent } from './gaming-landing.component';

describe('GamingLandingComponent', () => {
  let component: GamingLandingComponent;
  let fixture: ComponentFixture<GamingLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamingLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamingLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
