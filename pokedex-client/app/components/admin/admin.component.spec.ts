import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountMenuComponent } from '@components/account-menu/account-menu.component';
import { PokedexService } from '@services/pokedex.service';
import { ToastrService } from 'ngx-toastr';
import { AdminComponent } from './admin.component';

xdescribe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  const pokedexService = jasmine.createSpyObj('PokedexService', ['getPokemons', 'getPokemon', 'getPokemonByType']);
  const toastrService = jasmine.createSpyObj('ToastrService', ['success']);
  const router = { navigate: jasmine.createSpy('navigate') };
  const jwtHelper = jasmine.createSpyObj('JwtHelper', ['decodeToken']);
  const matDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent, AccountMenuComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: PokedexService,
        useValue: pokedexService
      }, {
        provide: ToastrService,
        useValue: toastrService
      }, {
        provide: Router,
        useValue: router
      }, {
        provide: JwtHelperService,
        useValue: jwtHelper
      }, {
        provide: MatDialog,
        useValue: matDialog
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
