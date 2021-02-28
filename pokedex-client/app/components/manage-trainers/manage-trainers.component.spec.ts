import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColumnFilterComponent } from '@components/column-filter/column-filter.component';
import { ToastrService } from 'ngx-toastr';
import { ManageTrainersComponent } from './manage-trainers.component';

describe('ManageTrainersComponent', () => {
  let component: ManageTrainersComponent;
  let fixture: ComponentFixture<ManageTrainersComponent>;

  const toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
  const matDialog = jasmine.createSpyObj('MatDialog', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageTrainersComponent, ColumnFilterComponent],
      imports: [
        HttpClientTestingModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatTableModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: ToastrService,
        useValue: toastrService
      }, {
        provide: MatDialog,
        useValue: matDialog
      }]
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
