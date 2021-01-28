import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLoadingComponent } from './detail-loading.component';

describe('DetailLoadingComponent', () => {
  let component: DetailLoadingComponent;
  let fixture: ComponentFixture<DetailLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
