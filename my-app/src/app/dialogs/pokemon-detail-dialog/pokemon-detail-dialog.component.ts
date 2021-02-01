import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { forkJoin, Observable } from 'rxjs';
import { PokeApiPokemon } from 'src/app/models/poke-api-pokemon';
import { PokedexService } from 'src/app/services/pokedex.service';

export interface Move {
  name: string,
  power: number,
  accuracy: number,
  pp: number
};

const MOVE_DATA: Move[] = [
  { name: 'tackle', power: 40, accuracy: 100, pp: 15 }
];

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

  // Radar
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  radarChartLabels: Label[] = ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'];

  radarChartData: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';

  columnsToDisplay = ['name', 'type', 'category', 'power', 'accuracy', 'pp'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource;

  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort;

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
      error => { }
    );
  }

  handleSuccessfulResponse(response: PokeApiPokemon): void {
    this.isLoading = false;
    let { id, name, sprites, types, stats, moves, abilities } = response;
    this.pokemonDetail = { id, name, sprites, types, stats, moves, abilities };

    let data: any[] = []
    this.pokemonDetail.stats.forEach((stat: any) => {
      data.push(stat.base_stat);
    });

    this.radarChartData = [...this.radarChartData, ...[{ data, label: 'Base Stats' }]];

    this.getMoves();
  }

  getMoves() {
    const calls: Observable<any>[] = [];
    this.pokemonDetail.moves.forEach((move: any) => calls.push(this.pokedexService.getByFullUrl(move.move.url)));
    forkJoin(calls).subscribe(moveDetails => {
      let moveDataSource: any[] = [];
      moveDetails.forEach(detail =>
        moveDataSource.push({
          name: detail.name,
          type: detail.type.name,
          category: detail.damage_class.name,
          power: detail.power,
          accuracy: detail.accuracy,
          pp: detail.pp
        }));
      this.dataSource = new MatTableDataSource(moveDataSource)
      this.dataSource.sort = this.sort;
    });
  }

  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
