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
      type='scatter'
      data={{
        datasets: [
          {
            label: 'ROC curve class 0',
            borderDash: [1, 0],
            borderColor: "#5c415d",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
            fill: false,
            data: objs.coord_line_0,
          },
          {
            label: 'ROC curve class 1',
            borderDash: [1, 0],
            borderColor: "#8abb21",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
            fill: false,
            data: objs.coord_line_1,
          },
          {
            label: 'Micro-average ROC curve',
            borderDash: [5, 5],
            borderColor: "#f64d2a",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
            fill: false,
            data: objs.coord_line_mic,
          },
          {
            label: 'Macro-average ROC curve',
            borderDash: [5, 5],
            borderColor: "#2d95ec",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
            fill: false,
            data: objs.coord_line_mac,
          },
          {
            label: 'Auxiliar',
            borderColor: '#000',
            borderDash: [8, 4],
            fill: false,
            data: [{
              x: 1,
              y: 1
            }, {
              x: 0,
              y: 0
            }],
          },
        ],
      }}
      options={{
        responsive: true,
        devicePixelRatio: 5,
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
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
        animation: {
          easing: 'easeInOutCubic',
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }}
    />
  )
  return <Chart title={menssage} crop={crop}> {Plot} </Chart>
}

export default ROC;

