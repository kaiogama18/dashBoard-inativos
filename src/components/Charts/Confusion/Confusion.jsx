import React, { useState, useEffect } from 'react';
import Chart from '../../Chart/Chart';
import Rota from '../../../Routes/Rota';
import cx from 'classnames';
import {
  HeatMapComponent,
  Inject,
  Legend,
  Tooltip,
  Adaptor,
} from '@syncfusion/ej2-react-heatmap';

const Confusion = ({ crop }) => {
  const route = '/home/safras/confusion_matrix';
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


  if (data.length) {

    let true_n = data[0].true_negative;
    if (!data) true_n = '0.0';

    let false_p = data[0].false_positive;
    if (!data) false_p = '0.0';

    let false_n = data[0].false_negative;
    if (!data) false_n = '0.0';

    let true_p = data[0].true_positive;
    if (!data) true_p = '0.0';
  }




  const Plot = (data.length) ? (
    <HeatMapComponent
      id="heatmap"
      xAxis={{
        valueType: 'Category',
        labels: ['0', '1'],
      }}
      yAxis={{
        valueType: 'Category',
        labels: ['1', '0'],
      }}
      paletteSettings={{
        palette: [
          { color: '#C06C84' },
          { color: '#6C5B7B' },
          { color: '#355C7D' },
        ],
        type: 'Gradient',
      }}
      dataSource={[
        [true_n, false_p],
        [false_n, true_p],
      ]}
    >
      <Inject services={[Adaptor, Legend, Tooltip]} />
    </HeatMapComponent>

  ) : <div className=" col-span-3 p-5">
      <div className=" flex items-center justify-center flex-col">
        <img className="w-4/12" src="/no.png" />
        <p className="subtitle mt-5 text-gray-600">Safra sem dados no momento</p>
      </div>
    </div>

  return <Chart title={menssage} crop={crop}> {Plot} </Chart>
};

export default Confusion;
