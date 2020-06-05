import React, { useState, useEffect, Component } from 'react';

import Rota from '../../../Routes/Rota';
import useSWR from "swr";
import "chartjs-chart-matrix"
import { CardChart } from '../..';


class Confusion extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const ctx = this.chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: 'matrix',
      data: {
        datasets: [{
          label: 'My Matrix',
          data: [
            { x: 0.75, y: 1},
            { x: 0.43, y: 0 },
            { x: 0.25, y: 0},
            { x: 0.57, y: 1 },

          ],
          backgroundColor: function (ctx) {
            var value = ctx.dataset.data[ctx.dataIndex].v;
            var alpha = (value - 5) / 40;
            return Color('green').alpha(alpha).rgbString();
          },
          // borderColor: function (ctx) {
          //   var value = ctx.dataset.data[ctx.dataIndex].v;
          //   var alpha = (value - 5) / 40;
          //   return Color('green').alpha(alpha).darken(0.3).rgbString();
          // },
          borderWidth: { left: 3, right: 3 },
          width: function (ctx) {
            var a = ctx.chart.chartArea;
            return (a.right - a.left) / 5.5;
          },
          height: function (ctx) {
            var a = ctx.chart.chartArea;
            return (a.bottom - a.top) / 3.5;
          }
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            // offset: true,
            ticks: {
              display: true,
              min: 1,
              max: 0,
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            position: 'right',
            ticks: {
              source: 'labels',
              reverse: false,
              display: true,
              min: 0,
              max: 1,
              stepSize: 1
            },
            gridLines: {
              display: false
            },
          }]
        }
      }

    });
  }
  render() {
    return (
      <CardChart title={"menssage"} crop={1555}> <canvas
        id="myChart"
        ref={this.chartRef}
      /> </CardChart>
    )
  }
};

export default Confusion;
