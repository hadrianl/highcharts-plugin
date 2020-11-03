import React from 'react';
// import ReactHighcharts from 'react-highcharts';
import { PanelProps } from '@grafana/data';
import { HighchartsOptions } from 'types';
import Highcharts from 'highcharts';
// import { css, cx } from 'emotion';
// import { useTheme } from '@grafana/ui';

interface Props extends PanelProps<HighchartsOptions> {}

export const HighchartsPanel: React.FC<Props> = ({ options, data, width, height }) => {
  let config: Highcharts.Options;
  // let theme = useTheme();
  config =  {
    chart: {
      height: height,
      width: width,
      animation: false,
    },
    scrollbar: {
      enabled: false,
    }
  }


  switch (options.chartType) {
    case 'normal':
      const ReactHighcharts = require('react-highcharts');
      return <ReactHighcharts config={config}></ReactHighcharts>
    case 'stock':
      const ReactHighstock = require('react-highcharts/ReactHighstock');
      let data_len = data.series[0].length;
      let ohlc = [];
      let volumn = [];
      for (let i=0;i < data_len;i++) {
        ohlc.push([
          data.series[0].fields[0].values.get(i),
          data.series[0].fields[1].values.get(i),
          data.series[1].fields[1].values.get(i),
          data.series[2].fields[1].values.get(i),
          data.series[3].fields[1].values.get(i),
        ]);
        volumn.push([
          data.series[0].fields[0].values.get(i),
          data.series[4].fields[1].values.get(i),
        ])
      };

      config.series = [{
          type: 'candlestick',
          name: 'ohlc',
          upColor: options.upColor,
          color: options.downColor,
          data: ohlc,
          animation: false,
          tooltip: {
            dateTimeLabelFormats: {
              millisecond:"%A, %b %e, %H:%M:%S.%L",
              second:"%A, %b %e, %H:%M:%S",
              minute:"%A, %b %e, %H:%M",
              hour:"%A, %b %e, %H:%M",
              day:"%A, %b %e, %Y",
              week:"Week from %A, %b %e, %Y",
              month:"%B %Y",
              year:"%Y"
            }
          },
      },{
          type: 'column',
          name: 'volumn',
          data: volumn,
          yAxis: 1,
          animation: false,
      }];
      config.yAxis = [{
          labels: {
              align: 'right',
              x: -3
          },
          height: '70%',
          resize: {
              enabled: true
          },
          lineWidth: 2
        }, {
          labels: {
              align: 'right',
              x: -3
          },
          top: '70%',
          height: '25%',
          offset: 0,
          lineWidth: 2
      }];
      config.navigator = {enabled: false};

      config.rangeSelector = {enabled: false};
      config.time = {useUTC: options.time?.useUTC};
      return <ReactHighstock config={config}></ReactHighstock> 
    case 'map':
      const ReactHighmaps = require('react-highcharts/ReactHighmaps');
      return <ReactHighmaps config={config}></ReactHighmaps>
  }
};

