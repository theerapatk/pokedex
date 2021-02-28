import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
  let component: CreateAccountComponent;
  let fixture: ComponentFixture<CreateAccountComponent>;

  const toastrService = jasmine.createSpyObj('ToastrService', ['success', 'warning']);
  const authService = jasmine.createSpyObj('AuthenticationService', ['register']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAccountComponent],
      imports: [HttpClientTestingModule],
      providers: [{
        provide: ToastrService,
        useValue: toastrService
      }, {
        provide: AuthenticationService,
        useValue: authService
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
