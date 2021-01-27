import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokeApiPokemon } from 'src/app/models/poke-api-pokemon';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemon-detail-dialog',
  templateUrl: './pokemon-detail-dialog.component.html',
  styleUrls: ['./pokemon-detail-dialog.component.scss']
})
export class PokemonDetailDialogComponent implements OnInit {

  pokemonDetail: PokeApiPokemon = {
    id: 0,
    name: '',
    sprites: {
      front_default: ''
    }
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { url: string },
    private pokedexService: PokedexService
  ) { }

  ngOnInit() {
    this.pokedexService.getPokemon(this.data.url).subscribe(
      response => {
        let { id, name, sprites } = response;
        this.pokemonDetail.id = id;
        this.pokemonDetail.name = name;
        this.pokemonDetail.sprites = sprites;
      }
    );
  }

}
