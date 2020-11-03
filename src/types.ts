import { Options, PlotOptions } from 'highcharts';

type ChartType = 'normal' | 'stock' | 'map';
// type SubChartType = 'area' | 'arearange' | 'areaspline' | 'bar' | 'boxplot' | 
//                     'bubble' | 'column' | 'columnrange' | 'errorbar' | 'funnel' |
//                     'gauge' | 'heatmap' | 'line' | 'pie' | 'polygon' | 'pyramid' |
//                     'scatter' |


export interface HighchartsOptions extends Options {
  chartType: ChartType;
  subChartType: keyof PlotOptions;
  upColor?: string;
  downColor?: string;
  volColor?: string;
}