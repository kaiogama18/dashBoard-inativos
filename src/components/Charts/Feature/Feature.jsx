import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import Chart from '../../Chart/Chart';
import Rota from '../../../Routes/Rota';

const Feature = ({ crop }) => {
  const route = '/home/safras/top_features';
  const [menssage, setMenssage] = useState('');
  const [feature, setfeature] = useState([]);
  const [valor, setValor] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const { code, data, menssage } = await Rota({ route, param: { safra: crop } });
      if (code === 200) {
        setMenssage(menssage)
        setData(data)
        setfeature(data.map(i => i.feature))
        setValor(data.map(i => i.valor))
      }


    }
    fetchAPI();
  }, [crop])


  let dataArray = valor
  let dataIndexes = dataArray.map((i) => i);

  dataIndexes.sort((a, b) => {
    return dataArray[a] - dataArray[b];
  });

  dataArray.sort((a, b) => a - b);

  let newMeta = [];
  let newLabels = [];

  data.forEach((bar, i) => {
    let newIndex = dataIndexes.indexOf(i);
    newMeta[newIndex] = bar;
    newLabels[newIndex] = feature[i];
  });

  const Plot = (
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
  )

  return <Chart title={menssage} crop={crop}> {Plot} </Chart>
};

export default Feature;



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
