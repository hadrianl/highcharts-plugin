import { PanelPlugin } from '@grafana/data';
import { HighchartsOptions } from './types';
import { HighchartsPanel } from './HighchartsPanel';


export const plugin = new PanelPlugin<HighchartsOptions>(HighchartsPanel).setPanelOptions(builder => {

  return builder
    .addRadio({
      path: 'chartType',
      defaultValue: 'nornal',
      name: 'Chart Type',
      settings: {
        options: [
          {
            value: 'normal',
            label: 'normal',
          },
          {
            value: 'stock',
            label: 'stock',
          },
          {
            value: 'map',
            label: 'map',
          },
        ],
      },
    })
    .addSelect({
      path: 'subChartType',
      defaultValue: 'line',
      name: 'Sub Chart Type',
      settings: {
        options: [
          {
            value: 'line',
            label: 'line',
          },
          {
            value: 'bar',
            label: 'bar',
          },
          {
            value: 'histogram',
            label: 'histogram',
          },
          {
            value: 'candlestick',
            label: 'candlestick',
          },
          {
            value: 'column',
            label: 'column',
          }
        ],
      },
    })
    .addColorPicker({
      path: 'upColor',
      defaultValue: 'red',
      name: 'UpColor',
      settings: {
        allowUndefined: false,
        disableNamedColors: true,
      },
      showIf: c => c.chartType == 'stock',
    })
    .addColorPicker({
      path: 'downColor',
      defaultValue: 'green',
      name: 'Down Color',
      settings: {
        allowUndefined: false,
        disableNamedColors: true,
      },
      showIf: c => c.chartType == 'stock',
    })
    .addColorPicker({
      path: 'volColor',
      defaultValue: 'blue',
      name: 'Volumn Color',
      settings: {
        allowUndefined: false,
        disableNamedColors: true,
      },
      showIf: c => c.chartType == 'stock',
    })
    .addBooleanSwitch({
      path: 'time.useUTC',
      defaultValue: false,
      name: 'Use UTC'
    });
});