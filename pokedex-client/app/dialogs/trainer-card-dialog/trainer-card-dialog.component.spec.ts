import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCardDialogComponent } from './trainer-card-dialog.component';

describe('TrainerCardDialogComponent', () => {
  let component: TrainerCardDialogComponent;
  let fixture: ComponentFixture<TrainerCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerCardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
