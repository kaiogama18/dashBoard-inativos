import { Component } from 'react';
import { Line } from 'react-chartjs-2';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import React from 'react';
import Card from './Cards/Card';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Plot(props) {
  const route = 'roc_curve';
  const { data, error } = useSWR(
    '/api/api_inativo?route=' + route + '&key=' + props.safra,
    fetcher,
  );
  let title = data?.menssage;
  if (!data) title = 'Carregando...';
  if (error) title = 'Sem conexão com o servidor';
  let objs = [];
  data?.data.map((aux) => {
    objs = JSON.parse(aux.json.replace(/'/g, '"'));
  });

  function randomColorFactor() {
    return Math.round(Math.random() * 255);
  }
  function randomColor(opacity) {
    return (
      'rgba(' +
      randomColorFactor() +
      ',' +
      randomColorFactor() +
      ',' +
      randomColorFactor() +
      ',' +
      (opacity || '.3') +
      ')'
    );
  }

  var config = {
    type: 'line',
    data: {
      labels: ['0.0', '0.2', '0.4', '0.6', '0.8', '1.0'],
      datasets: [
        {
          label: 'roc_0',
          backgroundColor: 'rgba(249, 142, 28,0.75)',
          borderColor: '#ea6227',
          data: objs.x_0,
          lineTension: 0.9,
          fill: false,
        },
        {
          label: 'roc_1',
          borderColor: '#ff56ff',
          data: objs.y_0,
          borderDash: [8, 4],
          fill: false,
        },
        {
          label: 'mic_avg',
          borderColor: '#1236f9',
          data: objs.x_1,
          lineTension: 0.9,
          fill: false,
        },
        {
          label: 'mac_avg',
          borderColor: '#62bb6d',
          data: objs.y_1,
          lineTension: 0.9,
          fill: false,
        },
      ],
    },
  };

  config.data.datasets.forEach(function (dataset) {
    dataset.borderColor = randomColor(1);
    dataset.backgroundColor = '#de1414';
    dataset.pointBorderColor = randomColor(0.7);
    dataset.pointBackgroundColor = randomColor(0.5);
  });

  return (
    <Card>
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
                ticks: {
                  max: 0.010531242686637023,
                  min: 0.0,
                  stepSize: 0.001,
                },
              },
            ],
          },
        }}
        data={config.data}
      />
    </Card>
  );
}

class ROCcurves extends React.Component {
  render() {
    return <Plot safra={this.props.safra} />;
  }
}

// ROCcurves.propTypes = {
//   props: PropTypes.string.isRequired,
// };

export default ROCcurves;
