import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetail } from '@models/pokemon-detail';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-pokemon-summary',
  templateUrl: './pokemon-summary.component.html',
  styleUrls: ['./pokemon-summary.component.scss']
})
export class PokemonSummaryComponent implements OnInit {

  // Radar
  radarChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false }
  };
  radarChartLabels: Label[] = ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'];

  radarChartData: ChartDataSets[] = [];
  radarChartType: ChartType = 'radar';

  @Input() pokemonDetail: PokemonDetail = {
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

  constructor() { }

  ngOnInit(): void {
    const { stats } = this.pokemonDetail;
    this.radarChartData = [...this.radarChartData, ...[{
      data: stats.map((stat: any) => stat.base_stat), label: 'Base Stats'
    }]];
  }

  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
