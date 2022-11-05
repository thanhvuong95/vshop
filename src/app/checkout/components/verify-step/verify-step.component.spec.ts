import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyStepComponent } from './verify-step.component';

describe('VerifyStepComponent', () => {
  let component: VerifyStepComponent;
  let fixture: ComponentFixture<VerifyStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
