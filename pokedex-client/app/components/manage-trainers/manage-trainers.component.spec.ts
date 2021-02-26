import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrainersComponent } from './manage-trainers.component';

describe('ManageTrainersComponent', () => {
  let component: ManageTrainersComponent;
  let fixture: ComponentFixture<ManageTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTrainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
