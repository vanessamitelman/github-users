import React from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Chart from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: 'column3d', // The chart type
    width: '100%', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption:"Most Popular",
        captionFontSize:"16px",
        xAxisName: 'Stars',
        xAxisNameFontSize: '16px',
        yAxisName: 'Repos',
        yAxisNameFontSize: '16px',

      },
      // Chart Data
      data
    }
  };
  return <ReactFC {...chartConfigs} />;
};
export default ChartComponent;
