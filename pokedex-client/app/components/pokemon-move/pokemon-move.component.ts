import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Move } from '@models/move';
import { PokedexService } from '@services/pokedex.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-move',
  templateUrl: './pokemon-move.component.html',
  styleUrls: ['./pokemon-move.component.scss']
})
export class PokemonMoveComponent implements OnInit {

  isLoadingMove = true;
  columnsToDisplay = ['name', 'type', 'category', 'power', 'accuracy', 'pp'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @Input() pokemonMoves: any = [];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getMoves();
  }

  private getMoves(): void {
    if (this.pokemonMoves.length > 0) {
      const calls = this.pokemonMoves.map(
        (move: any) => this.pokedexService.getByFullUrl(move.move.url));

      forkJoin(calls).subscribe(moveDetails => {
        const dataSource = moveDetails.map((detail: any) => ({
          name: detail.name,
          type: detail.type.name,
          category: detail.damage_class.name,
          power: detail.power,
          accuracy: detail.accuracy,
          pp: detail.pp
        } as Move));

        this.dataSource = new MatTableDataSource(dataSource);
        this.dataSource.sort = this.sort;
        this.isLoadingMove = false;
      });
    }
  }

}
