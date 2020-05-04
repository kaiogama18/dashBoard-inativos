import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from '../../Chart/Chart';
import Rota from '../../../Routes/Rota';

function Mixed({ crop }) {
  const route = '/home/safras/score_distribution';
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
  )

  return <Chart title={menssage} crop={crop}> {Plot} </Chart>


}

export default Mixed;


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
