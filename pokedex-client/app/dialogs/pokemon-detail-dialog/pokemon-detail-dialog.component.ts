import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonDetail } from '@models/pokemon-detail';
import { PokedexService } from '@services/pokedex.service';

@Component({
  selector: 'app-pokemon-detail-dialog',
  templateUrl: './pokemon-detail-dialog.component.html',
  styleUrls: ['./pokemon-detail-dialog.component.scss']
})
export class PokemonDetailDialogComponent implements OnInit {

  isLoading = true;
  pokemonDetail: PokemonDetail = {
    id: 0,
    name: '',
    types: [{
      slot: 0,
      type: {
        name: '',
        url: ''
      }
    }],
    sprites: {
      front_default: ''
    },
    stats: [],
    moves: [],
    abilities: []
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pokedexService: PokedexService,
    public dialogRef: MatDialogRef<PokemonDetailDialogComponent>
  ) { }

  ngOnInit(): void {
    this.getPokemon();
    // setTimeout(() => {
    // }, 500);
  }

  private getPokemon(): void {
    this.pokedexService.getPokemon(this.data.selfUrl).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.isLoading = false
    );
  }

  private handleSuccessfulResponse(response: PokemonDetail): void {
    this.isLoading = false;
    const { id, name, sprites, types, stats, moves, abilities } = response;
    this.pokemonDetail = { id, name, sprites, types, stats, moves, abilities };
  }

  onNextPokemonClick(isNext = false): void {
    this.dialogRef.close({ id: isNext ? this.getNextId(true) : this.getNextId(false) });
  }

  getNextImgSrc(): string {
    const nextId = Number(this.data.selfId) + 1;
    return this.data.next.dataset === true ? this.data.next.dataset.imgsrc :
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextId}.png`;
  }

  private getNextId(isNext: boolean): string {
    let id = this.data.previous?.id;
    if (isNext) {
      if (this.data.next.id) {
        id = this.data.next.id;
      } else {
        id = Number(this.data.selfId) + 1;
      }
    }
    return id;
  }

}
