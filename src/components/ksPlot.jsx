import { Component } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Card from './Cards/Card';
import CountUp from 'react-countup';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

const KsPlot = ({ crop }) => {
  const { data, error } = useSWR(
    '/api/api_inativo?route=' + 'ks_curve' + '&key=' + crop,
    fetcher,
  );

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
            label: '0.535854515034651 ',
            backgroundColor: 'rgba(249, 142, 28,0.75)',
            borderColor: '#de1414',
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
        {crop ? <>{data?.menssage}</> : <>Ks statistic</>}
      </p>
      <p className="subtitle">
        Safra: <CountUp start={0} end={crop} duration={1} />
      </p>
      <br />
      {Chart}
    </Card>
  );
};

export default KsPlot;
