import React, { useState, useEffect } from 'react';
import Chart from '../../Chart/Chart';
import Rota from '../../../Routes/Rota';
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

  const Plot = (data.length) ? (
    <HeatMapComponent
      // titleSettings={{
      //   text: '*No eixo y: Etiqueta verdadeira *No eixo x: Etiqueta prevista',
      // }}
      xAxis={{
        title: { text: 'Etiqueta prevista' },
        valueType: 'Category',
        labels: ['0', '1'],
      
      }}
      yAxis={{
        title: { text: 'Etiqueta verdadeira' },
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
        // [data[0].true_negative, data[0].false_positive],
        // [data[0].false_negative, data[0].true_positive],
        [ data[0].false_positive, data[0].true_negative,],
        [ data[0].true_positive, data[0].false_negative],
      ]}
      cellSettings={{
        format: '{value}'
    }}
    >
      <Inject services={[Adaptor, Legend, Tooltip]} />
    </HeatMapComponent>

  ) : <div className=" col-span-3 p-5">
      <div className=" flex items-center justify-center  text-center flex-col">
        <img className="w-4/12" src="/no.png" />
        <p className="subtitle mt-5 text-gray-600">Sem dados no momento</p>
      </div>
    </div>




  return <Chart title={menssage} crop={crop}> {Plot} </Chart>

  //  return <Chart title={menssage} crop={crop}> {(data.length) ? data[0].true_positive : "nãoteste"} </Chart>

};

export default Confusion;
