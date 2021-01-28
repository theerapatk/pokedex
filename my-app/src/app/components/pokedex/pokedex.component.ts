import { Component, OnInit } from '@angular/core';
import { PokeApiResult } from 'src/app/models/poke-api-result';
import { PokedexService } from 'src/app/services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  pokemons: PokeApiResult[] = [];
  nextUrl: string = '';

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons(): void {
    this.pokedexService.getPokemons(this.nextUrl).subscribe(
      response => {
        this.pokemons = [...this.pokemons, ...response.results];
        this.nextUrl = response.next;
      }
    );
  }

  onScroll(): void {
    if (this.nextUrl) {
      this.getPokemons();
    }
  }

  getId(url: string): string {
    return url.split('pokemon/')[1].split('/')[0];
  }

}
