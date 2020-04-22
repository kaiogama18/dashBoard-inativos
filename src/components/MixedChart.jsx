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
  const route = 'score_distribution';
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

  const state = {
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
          type: 'bar',
          label: 'Distribuição da População',
          borderColor: '#e1aa10',
          backgroundColor: 'rgba(49, 130, 206,0.8)',
          data: objs.x_dist,
        },
        {
          fill: true,
          label: 'Taxa de Inadimplência',
          backgroundColor: 'rgba(244, 144, 128, 0.8)',
          data: objs.x_inad,
          borderDash: [8, 8],
          borderColor: '#de1414',
        },
      ],
    },
  };

  return (
    <Card>
      <p className="text-base uppercase">{title}</p>
      <p className="text-sm font-bold">Safra: {props.safra}</p>
      <br />
      <Line
        options={{
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
        data={state.data}
      />
    </Card>
  );
}

class MixedChart extends React.Component {
  render() {
    return <Plot safra={this.props.safra} />;
  }
}

// MixedChart.propTypes = {
//   props: PropTypes.string.isRequired,
// };

export default MixedChart;
