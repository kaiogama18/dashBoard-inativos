import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Chart from '../../Chart/Chart';
import Rota from '../../../Routes/Rota';



const Ks = ({ crop }) => {
  const route = '/home/safras/ks_curve';
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
            label: 'Classe 0',
            backgroundColor: 'rgba(249, 142, 28,0.75)',
            borderColor: '#de1414',
            data: objs.x_0,
            lineTension: 0.9,
            fill: false,
          },
          {
            label: 'Classe 1',
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
