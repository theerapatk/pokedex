import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfileComponent } from './trainer-profile.component';

describe('TrainerProfileComponent', () => {
  let component: TrainerProfileComponent;
  let fixture: ComponentFixture<TrainerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
