import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TrainerCardDialogComponent } from './trainer-card-dialog.component';

describe('TrainerCardDialogComponent', () => {
  let component: TrainerCardDialogComponent;
  let fixture: ComponentFixture<TrainerCardDialogComponent>;

  const jwtHelper = jasmine.createSpyObj('JwtHelper', ['decodeToken']);
  const router = { navigate: jasmine.createSpy('navigate') };
  const matDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainerCardDialogComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [{
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
    fixture = TestBed.createComponent(TrainerCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
