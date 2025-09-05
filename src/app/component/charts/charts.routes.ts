import { Routes } from '@angular/router';
import { ApexChartComponent } from './apex-chart/apex-chart.component';
import { ChartJsChartComponent } from './chart-js-chart/chart-js-chart.component';
import { ChartistChartComponent } from './chartist-chart/chartist-chart.component';
import { GoogleChartComponent } from './google-chart/google-chart.component';

export default [
  {
    path: 'apex-chart',
    component: ApexChartComponent,
    data: {
      title: "Apex Chart",
      breadcrumb: "Apex Chart",

    }
  },
  {
    path: 'google-chart',
    component: GoogleChartComponent,
    data: {
      title: "Google Chart",
      breadcrumb: "Google Chart",

    }
  },
  {
    path: 'chartjs-chart',
    component: ChartJsChartComponent,
    data: {
      title: "ChartJS Chart",
      breadcrumb: "ChartJS Chart",

    }
  },
  {
    path: 'chartist-chart',
    component: ChartistChartComponent,
    data: {
      title: "Chartist Chart",
      breadcrumb: "Chartist Chart",

    }
  },
] as Routes;

