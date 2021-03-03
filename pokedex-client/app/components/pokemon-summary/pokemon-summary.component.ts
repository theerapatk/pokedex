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

  ngOnInit(): void {
    this.radarChartData = [...this.radarChartData, ...[{
      data: this.buildStatData(), label: 'Base Stats'
    }]];
  }

  private buildStatData(): [] {
    const { stats } = this.pokemonDetail;
    return stats && stats.length !== 0 ? stats.map((stat: any) => stat.base_stat) : [];
  }

  chartClicked({ event, active }: any): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: any): void {
    console.log(event, active);
  }

}
