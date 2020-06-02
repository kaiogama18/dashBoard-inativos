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


  // console.log("Points x_0: " + JSON.stringify(points.map(a => a.x_0), null, 2))
  // console.log("Points y_0: " + JSON.stringify(points.map(a => a.y_0), null, 2))
  // console.log("Points x_1: " + JSON.stringify(points.map(a => a.x_1), null, 2))
  // console.log("Points y_1: " + JSON.stringify(points.map(a => a.y_1), null, 2))
  // console.log("Points x_ks: " + JSON.parse("[" + JSON.stringify(points.map(a => a.x_ks), null, 2).split()+ "]"))
  // console.log("Points x_ks: " + JSON.parse(points.map(a => a.x_ks)))
  // console.log("Points x_ks: " + JSON.parse("[" + JSON.stringify(points.map(a => a.x_ks), null, 2) + "]"))
  // console.log("Points ks_val_1: " + points.map(a => a.ks_val_1))
  // y_ks: [0.3250643575941961, 0.6860759493670886],
  // ks_val_1: "0.361",
  // ks_val_2: "0.536"

  console.log("Objs : " + JSON.stringify(objs.coord_line_0, null, 2))
  const Plot = (

    <Line
      type='scatter'
      data={{
        // labels: labels,
        datasets: [
          {
            label: 'Class 0',
            borderWidth: 1,
            backgroundColor: '#4bc0c0',
            borderColor: '#1236f9',
            pointRadius: 1,
            data: objs.coord_line_0,
            fill: false,
          },
          {
            label: 'Class 1',
            borderWidth: 1,
            backgroundColor: '#ff0000',
            borderColor: '#ea6227',
            pointRadius: 1,
            data: objs.coord_line_1,
            fill: false,
          },
          {
            label: 'Class KS',
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
      }}
    />
  )

  return <Chart title={menssage} crop={crop}> {Plot} </Chart>
};

export default Ks;
// const labels = ['0.00', '0.2', '0.4', '0.6', '0.8', '1.0']
