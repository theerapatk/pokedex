import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountMenuComponent } from '@components/account-menu/account-menu.component';
import { PokedexService } from '@services/pokedex.service';
import { asyncData } from '@utils/async-observable-helpers';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrService } from 'ngx-toastr';
import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;

  const pokedexService = jasmine.createSpyObj('PokedexService', ['getPokemons', 'getPokemon', 'getPokemonByType']);
  const toastrService = jasmine.createSpyObj('ToastrService', ['success']);
  const router = { navigate: jasmine.createSpy('navigate') };
  const jwtHelper = jasmine.createSpyObj('JwtHelper', ['decodeToken']);
  const matDialog = jasmine.createSpyObj('MatDialog', ['closeAll']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokedexComponent, AccountMenuComponent],
      imports: [
        HttpClientTestingModule,
        MatToolbarModule,
        InfiniteScrollModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
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
    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;

    pokedexService.getPokemons.and.returnValue(asyncData({ "count": 1118, "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20", "previous": null, "results": [{ "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }, { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }, { "name": "venusaur", "url": "https://pokeapi.co/api/v2/pokemon/3/" }, { "name": "charmander", "url": "https://pokeapi.co/api/v2/pokemon/4/" }, { "name": "charmeleon", "url": "https://pokeapi.co/api/v2/pokemon/5/" }, { "name": "charizard", "url": "https://pokeapi.co/api/v2/pokemon/6/" }, { "name": "squirtle", "url": "https://pokeapi.co/api/v2/pokemon/7/" }, { "name": "wartortle", "url": "https://pokeapi.co/api/v2/pokemon/8/" }, { "name": "blastoise", "url": "https://pokeapi.co/api/v2/pokemon/9/" }, { "name": "caterpie", "url": "https://pokeapi.co/api/v2/pokemon/10/" }, { "name": "metapod", "url": "https://pokeapi.co/api/v2/pokemon/11/" }, { "name": "butterfree", "url": "https://pokeapi.co/api/v2/pokemon/12/" }, { "name": "weedle", "url": "https://pokeapi.co/api/v2/pokemon/13/" }, { "name": "kakuna", "url": "https://pokeapi.co/api/v2/pokemon/14/" }, { "name": "beedrill", "url": "https://pokeapi.co/api/v2/pokemon/15/" }, { "name": "pidgey", "url": "https://pokeapi.co/api/v2/pokemon/16/" }, { "name": "pidgeotto", "url": "https://pokeapi.co/api/v2/pokemon/17/" }, { "name": "pidgeot", "url": "https://pokeapi.co/api/v2/pokemon/18/" }, { "name": "rattata", "url": "https://pokeapi.co/api/v2/pokemon/19/" }, { "name": "raticate", "url": "https://pokeapi.co/api/v2/pokemon/20/" }] }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
