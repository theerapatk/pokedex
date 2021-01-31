import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
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
    stats: []
  };

  // Radar
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  radarChartLabels: Label[] = ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'];

  radarChartData: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';

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

  handleSuccessfulResponse(response: any): void {
    this.isLoading = false;
    let { id, name, sprites, types, stats } = response;
    this.pokemonDetail = { id, name, sprites, types, stats };

    let data: any[] = []
    this.pokemonDetail.stats.forEach((stat: any) => {
      data.push(stat.base_stat);
    });

    this.radarChartData = [...this.radarChartData, ...[{ data, label: 'Base Stats' }]];
  }

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
