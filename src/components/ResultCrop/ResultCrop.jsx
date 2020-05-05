import React, { useState, useEffect } from 'react';
import { Card } from '..';
import cx from 'classnames';
import Rota from '../../Routes/Rota';
import CountUp from 'react-countup';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button } from '@material-ui/core';


const ResultCrop = ({ crop }) => {
  const route = '/home/safras/result'
  const [data, setData] = useState([]);
  const [menssage, setMenssage] = useState('');

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

  return (
    <div className="grid grid-cols-1">
      <Card className={cx('card', 'card-results')}>
        <a className="title"> {menssage ? menssage : <Skeleton width={300} animation="wave" />}</a>
        <a className="subtitle"> {data.length ? data[0].rotulo : <Skeleton width={500} animation="wave" />} </a>

        <p className="subtitle">
          {data.length ? (
            <a className="font-bold">
              AUC: <CountUp start={0} end={data[0].auc} decimal="." />
              {' '} e {' '}
              KS: <CountUp start={0} end={data[0].ks} decimal="." />
            </a>
          ) : <Skeleton width={200} animation="wave" />
          }
        </p>
        <a className="subtitle">
          {data.length ? (
            <a>
              Instância de Teste: <CountUp start={0} end={data[0].instancias_teste} decimal="." separator="." />
            </a>
          ) : <Skeleton width={250} animation="wave" />}
        </a>

      </Card>
      {crop ? <Button variant="contained" color="primary">
        <p className="text-base font-bold">
          Fazer dowload do CSV </p>
      </Button> : <Button variant="contained" disabled >
          <p className="text-base font-bold">
            Fazer dowload do CSV </p>
        </Button>}



      {/* <button className="btn-csv">
      </button> */}
    </div>
  );
};

export default ResultCrop;
