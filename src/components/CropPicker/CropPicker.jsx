import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import cx from 'classnames';
import Rota from '../../Routes/Rota';
import Skeleton from "@material-ui/lab/Skeleton";
import Router from 'next/router';
// import safras from '../../data/safra.json';


const CropPicker = ({ handleCropChange }) => {
  const route = '/home/safras'
  const [data, setData] = useState([]);
  const [safras, setSafras] = useState([]);
  const [menssage, setMenssage] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data, menssage } = await Rota({ method: 'GET', route });
        setMenssage(menssage)
        setData(data)
        setSafras(data.map((aux) => aux.safra).reverse())
      } catch (error) {
        Router.push('/login');
      }
    }
    fetchAPI();
  }, [route])

  return (
    <Card className={cx('card', 'card-picker')}>
      <div className="self-center">
        <p className="title">
          {menssage ? menssage : <Skeleton width={300} animation="wave" />}
        </p>
        <p className="subtitle">{cropTitle}</p>
      </div>
      <div className="crop-colunm">

        {
          safras.map(safra => (
            <div key={safra} className="crop-colunm__item">
              <button className="crop-colunm__btn"
                onClick={() => handleCropChange(safra)}>
              </button>
              <p>{safra}</p>
            </div>
          ))
        }

      </div>

    </Card>
  );
};

export default CropPicker;



const cropTitle = 'Clique para selecionar o ano e mês correspondente';
const numbers = [
  '201804',
  '201805',
  '201806',
  '201807',
  '201808',
  '201809',
  '201810',
  '201811',
  '201812',
];
