import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from '../../Chart/Chart';
import Rota from '../../../Routes/Rota';

function ROC({ crop }) {
  const route = '/home/safras/roc_curve';
  const [menssage, setMenssage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const { code, data, menssage } = await Rota({ route, param: { safra: crop } });
      if (code === 200) {
        setMenssage(menssage)
        setData(data)
      }

    }
    fetchAPI();
  }, [crop])


  let objs = [];
  data.map((aux) => {
    objs = JSON.parse(aux.json.replace(/'/g, '"'));
  });

  const Plot = (
    <Line
      data={{
        labels: labels,
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
  )

  return <Chart title={menssage} crop={crop}> {Plot} </Chart>
}

export default ROC;

const labels = ['0.0', '0.2', '0.4', '0.6', '0.8', '1.0']
