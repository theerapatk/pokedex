import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokeApiPokemon } from 'src/app/models/poke-api-pokemon';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokemon-detail-dialog',
  templateUrl: './pokemon-detail-dialog.component.html',
  styleUrls: ['./pokemon-detail-dialog.component.scss']
})
export class PokemonDetailDialogComponent implements OnInit {

  isLoading = true;
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
    setTimeout(() => {
      this.getPokemon();
    }, 1000);
  }

  private getPokemon() {
    this.pokedexService.getPokemon(this.data.url).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => {}
    );
  }

  handleSuccessfulResponse(response: any): void {
    this.isLoading = false;
    let { id, name, sprites } = response;
    this.pokemonDetail = { id, name, sprites };
  }
}
