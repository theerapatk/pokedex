import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailDialogLoadingComponent } from './detail-dialog-loading.component';

describe('DetailDialogLoadingComponent', () => {
  let component: DetailDialogLoadingComponent;
  let fixture: ComponentFixture<DetailDialogLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailDialogLoadingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDialogLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
