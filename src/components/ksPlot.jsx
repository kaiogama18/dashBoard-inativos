import { Component } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Plot(props) {
  const route = 'ks_curve';
  const { data, error } = useSWR(
    '/api/api_inativo?route=' + route + '&key=' + props.safra,
    fetcher,
  );
  let title = data?.menssage;
  if (!data) title = 'Carregando...';
  if (error) title = 'TOP FEATURES DO TREINO';
  let objs = [];
  data?.data.map((aux) => {
    objs = JSON.parse(aux.json.replace(/'/g, '"'));
  });

  var originalLineDraw = Chart.controllers.line.prototype.draw;

  Chart.helpers.extend(Chart.controllers.line.prototype, {
    draw: function () {
      originalLineDraw.apply(this, arguments);

      var chart = this.chart;
      var ctx = chart.chart.ctx;

      var index = chart.config.data.lineAtIndex;
      if (index) {
        var xaxis = chart.scales['x-axis-0'];
        var yaxis = chart.scales['y-axis-0'];

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(xaxis.getPixelForValue(undefined, index), yaxis.top);
        ctx.strokeStyle = '#ff0000';
        ctx.lineTo(xaxis.getPixelForValue(undefined, index), yaxis.bottom);
        ctx.stroke();
        ctx.restore();
      }
    },
  });

  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, '#80b6f4');
  gradientStroke.addColorStop(1, '#f49080');

  var config = {
    type: 'line',
    data: {
      labels: [
        '[0,10]',
        '[10,20]',
        '[20,30]',
        '[30,40]',
        '[40,50]',
        '[50,60]',
        '[60,70]',
        '[70,80]',
        '[80,90]',
        '[90,100]',
      ],
      datasets: [
        {
          label: '0.535854515034651 ',
          backgroundColor: 'rgba(249, 142, 28,0.75)',
          borderColor: gradientStroke,
          data: objs.x_0,
          lineTension: 0.9,
          fill: false,
        },
        {
          label: '0.3250643575941961',
          borderColor: '#ff56ff',
          data: objs.y_0,
          borderDash: [8, 4],
          lineTension: 0.9,
          fill: false,
        },
        {
          label: '0.535854515034651',
          borderColor: '#1236f9',
          borderDash: [8, 4],
          data: objs.x_1,
          lineTension: 0.9,
          fill: false,
        },
        {
          label: '0.6860759493670886',
          borderColor: '#62bb6d',
          data: objs.y_1,
          lineTension: 0.9,
          fill: false,
        },
      ],
      lineAtIndex: 2,
    },
  };

  return (
    <div className="overflow-hidden p-5 bg-white">
      <p className="text-base uppercase">{title}</p>
      <p className="text-sm font-bold">Safra: {props.safra}</p>

      <br />

      <Line
        options={{
          // legend: {
          //   display: false,
          // },
          responsive: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
        data={config.data}
      />
    </div>
  );
}

class KsPlot extends React.Component {
  render() {
    return <Plot safra={this.props.safra} />;
  }
}

// KsPlot.propTypes = {
//   props: PropTypes.string.isRequired,
// };

export default KsPlot;
