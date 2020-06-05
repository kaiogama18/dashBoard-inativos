import React, { useState, useEffect } from 'react';
import Card from "../Card/Card";
import cx from 'classnames';
import Rota from '../../Routes/Rota';
import CountUp from 'react-countup';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button, withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';


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

  const theme = createMuiTheme({
    palette: {
      primary: green,
    }
  });

  return (
    <div className="grid grid-cols-1">
      <Card className={cx('card', 'card-results')}>
        <div className="flex flex-col items-center">
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

        </div>

        <div className="bg-green-500 p-2 my-2">
          <a className="subtitle">
            {data.length ? (
              <a>
                Instância de Teste: <CountUp start={0} end={data[0].instancias_teste} decimal="." separator="." />
              </a>
            ) : <Skeleton width={250} animation="wave" />}
          </a>

          <p className="subtitle">
            {data.length ? (
              <a>
                Bons: <CountUp start={0} end={data[0].bons_pagadores_teste} decimal="." separator="." />%
                {' '} e {' '}
              Maus: <CountUp start={0} end={data[0].maus_pagadores_teste} decimal="." separator="." />%{' '}pagadores
              </a>
            ) : <Skeleton width={350} animation="wave" />
            }
          </p>
        </div>

        <div className="bg-red-500 p-2 my-2">
          <a className="subtitle">
            {data.length ? (
              <a>
                Instância de Treino: <CountUp start={0} end={data[0].instancias_treino} decimal="." separator="." />
              </a>
            ) : <Skeleton width={250} animation="wave" />}
          </a>

          <p className="subtitle">
            {data.length ? (
              <a>
                Bons: <CountUp start={0} end={data[0].bons_pagadores_treino} decimal="." separator="." />%
                {' '} e {' '}
              Maus: <CountUp start={0} end={data[0].maus_pagadores_treino} decimal="." separator="." />%{' '}pagadores
              </a>
            ) : <Skeleton width={350} animation="wave" />
            }
          </p>
        </div>
      </Card>

      {/* <MuiThemeProvider theme={theme}>
        {crop ? <Button variant="contained" color="primary">
          <p className="text-base text-white font-bold">
            Fazer dowload dos Scores </p>
        </Button> : <Button variant="contained" disabled >
            <p className="text-base font-bold">
              Fazer dowload dos Scores </p>
          </Button>}
      </MuiThemeProvider> */}
    </div>
  );
};

export default ResultCrop;
