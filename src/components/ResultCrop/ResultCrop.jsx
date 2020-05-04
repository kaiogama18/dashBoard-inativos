import useSWR from 'swr';
import { Card } from '..';
import React from 'react';
import cx from 'classnames';
import CountUp from 'react-countup';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Count({ props }) {
  return (
    <CountUp start={0}
      end={props}
      duration={1}

    />
  )
}

const ResultCrop = ({ crop }) => {
  const { data } = useSWR(
    '/api/api_inativo?route=' + 'result' + '&key=' + crop,
    fetcher,
  );

  return (
    <div className="grid grid-cols-1">
      <Card className={cx('card', 'card-results')}>
        <div>
          <p className="title">
            <a>RESULTADOS do TREINO: {' '}<Count props={crop} /></a>
          </p>
          <a className="subtitle">{crop ? data?.data.map(aux => aux.rotulo) : "BACKTEST 0_0 - LGBM - TUNED"}</a>
          <p className="subtitle">
            <a className="font-bold">
              AUC: <Count props={data?.data.map(aux => aux.auc)} />
              {' '}e KS: <Count props={data?.data.map(aux => aux.ks)} />
            </a>
          </p>
          <p className="subtitle">
            <a>
              Instância de Teste: {' '}
              <Count props={data?.data.map(aux => aux.instancias_teste)} />
            </a>
          </p>
        </div>
      </Card>
      <button className="btn-csv">
        <p className="subtitle font-bold text-white">Fazer dowload do CSV</p>
      </button>
    </div>


  );
};

export default ResultCrop;
