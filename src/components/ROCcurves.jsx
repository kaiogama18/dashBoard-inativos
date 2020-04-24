import { Component } from 'react';
import { Line } from 'react-chartjs-2';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import React from 'react';
import Card from './Cards/Card';
import CountUp from 'react-countup';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function ROCcurves({ crop }) {
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

  const Chart = (
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

  return (
    <Card>
      <p className="title">
        {crop ? <>{data?.menssage}</> : <>Top Features</>}
      </p>
      <p className="subtitle">
        Safra: <CountUp start={0} end={crop} duration={1} />
      </p>
      <br />
      {Chart}
    </Card>
  );
}

export default ROCcurves;
