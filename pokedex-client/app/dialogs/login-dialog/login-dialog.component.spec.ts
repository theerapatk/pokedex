import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateAccountComponent } from '@components/create-account/create-account.component';
import { AuthenticationService } from '@services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { LoginDialogComponent } from './login-dialog.component';

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let fixture: ComponentFixture<LoginDialogComponent>;

  const toastrService = jasmine.createSpyObj('ToastrService', ['success', 'warning']);
  const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
  const authService = jasmine.createSpyObj('AuthenticationService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginDialogComponent, CreateAccountComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: ToastrService,
        useValue: toastrService
      }, {
        provide: MatDialogRef,
        useValue: matDialogRef
      }, {
        provide: AuthenticationService,
        useValue: authService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
