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

function MixedChart({ crop }) {
  const { data, error } = useSWR(
    '/api/api_inativo?route=' + 'score_distribution' + '&key=' + crop,
    fetcher,
  );
  let title = data?.menssage;
  if (!data) title = 'Carregando...';
  if (error) title = 'TOP FEATURES DO TREINO';
  let objs = [];

  data?.data.map((aux) => {
    objs = JSON.parse(aux.json.replace(/'/g, '"'));
  });

  const Chart = (
    <Line
      data={{
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
            },
          ],
        },
      }}
    />
  );

  return (
    <Card>
      <p className="title">
        {crop ? <>{data?.menssage}</> : <>Distribution scrore</>}
      </p>
      <p className="subtitle">
        Safra: <CountUp start={0} end={crop} duration={1} />
      </p>
      <br />
      {Chart}
    </Card>
  );
}

export default MixedChart;
