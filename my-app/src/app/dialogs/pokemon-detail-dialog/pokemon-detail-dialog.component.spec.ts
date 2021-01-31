import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { PokeApiPokemon } from 'src/app/models/poke-api-pokemon';
import { PokedexService } from 'src/app/services/pokedex.service';
import { DetailDialogLoadingComponent } from '../detail-dialog-loading/detail-dialog-loading.component';
import { PokemonDetailDialogComponent } from './pokemon-detail-dialog.component';

describe('PokemonDetailDialogComponent', () => {
  let component: PokemonDetailDialogComponent;
  let fixture: ComponentFixture<PokemonDetailDialogComponent>;

  const serviceSpy = jasmine.createSpyObj('PokedexService', ['getPokemon']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonDetailDialogComponent, DetailDialogLoadingComponent],
      imports: [HttpClientTestingModule, MatCardModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PokedexService, useValue: serviceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailDialogComponent);
    component = fixture.componentInstance;
    const expected: PokeApiPokemon = { id: 1, name: 'bulbasuar', sprites: { front_default: '' } };
    serviceSpy.getPokemon.and.returnValue(of(expected));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
