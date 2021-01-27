import { Component, OnInit } from '@angular/core';
import { PokeApi } from 'src/app/models/poke-api';
import { PokeApiResult } from 'src/app/models/poke-api-result';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemons: PokeApiResult[] = [];

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  private getPokemon() {
    this.pokedexService.getPokemons().subscribe(
      response => this.pokemons = [...response.results]
    );
  }

}
