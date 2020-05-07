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


  console.log("Points x_ks: " + JSON.parse("[" + JSON.stringify(points.map(a => a.x_ks), null, 2) + "]"))

  // console.log("Points ks_val_1: " + points.map(a => a.ks_val_1))


  // y_ks: [0.3250643575941961, 0.6860759493670886],
  // ks_val_1: "0.361",
  // ks_val_2: "0.536"


  const Plot = (
    <Line
      data={{
        // labels: labels,
        datasets: [
          {
            label: 'Class 1',
            borderColor: '#4bc0c0',
            data: objs.x_ks,
            borderDash: [8, 4],
            fill: false,
          },
          {
            label: 'Class 0',
            borderColor: '#ffcc56',
            data: objs.y_ks,
            backgroundColor: 'rgba(255, 223, 147,0.35)'
          },
          {
            label: 'KS Statistic',
            borderColor: '#ff6284',
            data: objs.x_0,
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

const labels = [
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
]
