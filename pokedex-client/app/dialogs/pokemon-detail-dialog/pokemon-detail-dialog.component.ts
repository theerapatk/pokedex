import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Move } from '@models/move';
import { PokemonDetail } from '@models/pokemon-detail';
import { PokedexService } from '@services/pokedex.service';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail-dialog',
  templateUrl: './pokemon-detail-dialog.component.html',
  styleUrls: ['./pokemon-detail-dialog.component.scss']
})
export class PokemonDetailDialogComponent implements OnInit {

  isLoading = true;
  isLoadingMove = true;
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

  // Radar
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false }
  };
  radarChartLabels: Label[] = ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'];

  radarChartData: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';

  columnsToDisplay = ['name', 'type', 'category', 'power', 'accuracy', 'pp'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pokedexService: PokedexService,
    public dialogRef: MatDialogRef<PokemonDetailDialogComponent>
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getPokemon();
    }, 1000);
  }

  private getPokemon(): void {
    this.pokedexService.getPokemon(this.data.selfUrl).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.isLoading = false
    );
  }

  handleSuccessfulResponse(response: PokemonDetail): void {
    this.isLoading = false;
    const { id, name, sprites, types, stats, moves, abilities } = response;
    this.pokemonDetail = { id, name, sprites, types, stats, moves, abilities };

    this.radarChartData = [...this.radarChartData, ...[{
      data: stats.map((stat: any) => stat.base_stat), label: 'Base Stats'
    }]];
  }

  onSelectedTabChange(event: MatTabChangeEvent): void {
    if (event.index === 1 && this.isLoadingMove) {
      this.getMoves();
    }
  }

  getMoves(): void {
    if (this.pokemonDetail.moves.length > 0) {
      const calls = this.pokemonDetail.moves.map(
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

  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  onNextPokemonClick(isNext: boolean = false): void {
    this.dialogRef.close({ id: isNext ? this.data.next?.id : this.data.previous?.id });
  }

}
