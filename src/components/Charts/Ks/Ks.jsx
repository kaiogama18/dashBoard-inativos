import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Chart from '../../Chart/Chart';
import Rota from '../../../Routes/Rota';



const Ks = ({ crop }) => {
  const route = '/home/safras/ks_curve';
  const [menssage, setMenssage] = useState('');
  const [data, setData] = useState([]);
  const [points, setPoints] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      const { code, data, menssage } = await Rota({ route, param: { safra: crop } });
      if (code === 200) {
        setMenssage(menssage)
        setData(data)
        setPoints(data.map(a => JSON.parse(a.json.replace(/'/g, '"'))))
      }

    }
    fetchAPI();
    console.log("Points : " + JSON.stringify(points, null, 2))
    console.log("data : " + JSON.stringify(data, null, 2))

  }, [crop])

  let objs = [];
  data.map((aux) => {
    objs = JSON.parse(aux.json.replace(/'/g, '"'));
  });

  console.log("Objs : " + JSON.stringify(objs.coord_line_0, null, 2))
  const Plot = (

    <Line
      type='scatter'
      data={{
        datasets: [
          {
            label: 'Class 0',
            borderColor: "#2d95ec",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
            fill: false,
            data: objs.coord_line_0,
          },
          {
            label: 'Class 1',
            borderColor: "#f64d2a",
            backgroundColor: "#e755ba",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            pointHoverBackgroundColor: "#55bae7",
            pointHoverBorderColor: "#55bae7",
            fill: false,
            data: objs.coord_line_1,
          },
          {
            label: 'KS Statistic Plot',
            borderColor: '#000',
            data: objs.coord_line_ks,
            borderDash: [8, 4],
            fill: false,
          }
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
};

export default Ks;
