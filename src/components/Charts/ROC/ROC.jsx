import { Line } from 'react-chartjs-2';
import useSWR from 'swr';
import React from 'react';
import Chart from '../../Chart/Chart';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function ROC({ crop }) {
  const { data, error } = useSWR(
    '/api/api_inativo?route=' + 'roc_curve' + '&key=' + crop,
    fetcher,
  );
  let title = data?.menssage;
  if (!data) title = 'Carregando...';
  if (error) title = 'Sem conexão com o servidor';
  let objs = [];
  data?.data.map((aux) => {
    objs = JSON.parse(aux.json.replace(/'/g, '"'));
  });

  const Plot = (
    <Line
      data={{
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
      }}
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
              ticks: {
                max: 0.010531242686637023,
                min: 0.0,
                stepSize: 0.001,
              },
            },
          ],
        },
      }}
    />
  );

  return <Chart title={data?.menssage} crop={crop}> {Plot} </Chart>
}

export default ROC;
