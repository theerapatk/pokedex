import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { InlineFormComponent } from './inline-form.component';

describe('InlineFormComponent', () => {
  let component: InlineFormComponent;
  let fixture: ComponentFixture<InlineFormComponent>;

  const toastrService = jasmine.createSpyObj('ToastrService', ['success', 'warning']);
  const jwtHelper = jasmine.createSpyObj('JwtHelper', ['decodeToken']);
  const router = { navigate: jasmine.createSpy('navigate') };
  const matDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineFormComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [{
        provide: ToastrService,
        useValue: toastrService
      }, {
        provide: JwtHelperService,
        useValue: jwtHelper
      }, {
        provide: Router,
        useValue: router
      }, {
        provide: MatDialog,
        useValue: matDialog
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
