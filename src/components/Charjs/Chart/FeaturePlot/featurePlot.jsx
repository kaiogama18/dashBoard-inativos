import { HorizontalBar } from 'react-chartjs-2';
import useSWR from 'swr';
import React from 'react';
import CountUp from 'react-countup';
import Card from '../../../Cards/Card';

const FeaturePlot = ({ crop }) => {
  const { data, error } = useSWR(url + crop, fetcher);

  let feature = [];
  let valor = [];
  data?.data.map((aux) => (feature.push(aux.feature), valor.push(aux.valor)));
  let dataArray = valor;
  let dataIndexes = dataArray.map((d, i) => i);
  dataIndexes.sort((a, b) => {
    return dataArray[a] - dataArray[b];
  });

  dataArray.sort((a, b) => a - b);
  let newMeta = [];
  let newLabels = [];
  data?.data.forEach((bar, i) => {
    let newIndex = dataIndexes.indexOf(i);
    newMeta[newIndex] = bar;
    newLabels[newIndex] = feature[i];
  });
  feature = newLabels;

  const Chart = (
    <HorizontalBar
      data={{
        labels: feature.reverse(),
        datasets: [
          {
            data: valor.reverse(),
            fill: false,
            borderDash: [5, 5],
            backgroundColor: colors,
          },
        ],
      }}
      options={{
        responsive: true,
        legend: { display: false },
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
      <p className="title">{crop ? <>{data?.menssage}</> : <>falso</>}</p>
      <p className="subtitle">
        Safra: <CountUp start={0} end={crop} duration={1} />
      </p>
      <br />
      {Chart}
    </Card>
  );
};

export default FeaturePlot;

let url = '/api/api_inativo?route=' + 'top_features' + '&key=';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

const colors = [
  'rgba(196, 37, 125, 0.75)',
  'rgba(255, 99, 132, 100)',
  'rgba(255, 91, 25, 0.75)',
  'rgba(54, 162, 235, 0.75)',
  'rgba(255, 206, 86, 0.75)',
  'rgba(75, 192, 192, 0.75)',
  'rgba(153, 102, 255, 0.75)',
  'rgba(255, 159, 64, 0.75)',
  'rgba(255, 99, 132, 0.75)',
  'rgba(54, 162, 235, 0.75)',
  'rgba(255, 206, 86, 0.75)',
  'rgba(75, 192, 192, 0.75)',
  'rgba(153, 102, 255, 0.75)',
  'rgba(255, 159, 64, 0.75)',
  'rgba(48, 255, 210, 0.75)',
];
