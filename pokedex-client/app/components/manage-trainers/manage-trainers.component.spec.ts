import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
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
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSelectModule,
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
