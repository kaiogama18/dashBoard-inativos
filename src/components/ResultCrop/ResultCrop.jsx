import useSWR from 'swr';
import PropTypes from 'prop-types';
import React from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';
import { Card } from '..';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function ResultCrop({ crop }) {
  const route = 'result';
  const { data, error } = useSWR(
    '/api/api_inativo?route=' + route + '&key=' + crop,
    fetcher,
  );

  let title = data?.menssage;
  if (!data) title = 'Carregando...';
  if (error) title = 'sem internet';

  console.log(JSON.stringify(data, null, 2));

  return (
    <Card className={cx('card', 'card-results')}>
      <div>
        <p className="title">
          RESULTADOS do TREINO: <CountUp start={0} end={crop} duration={1} />
        </p>
        <p className="card-subtitle">
          {data?.data.map((aux) => (
            <>{aux.rotulo}</>
          ))}
        </p>

        {data?.data.map((aux) => (
          <>
            <p className="card-subtitle font-bold">
              AUC: <CountUp start={0} end={aux.auc} duration={1} /> e KS:{' '}
              <CountUp start={0} end={aux.ks} duration={1} />
            </p>

            <p className="card-subtitle ">
              Instância de Treino:{' '}
              <CountUp
                className="font-bold"
                start={0}
                end={aux.instancias_treino}
                duration={1}
                separator=","
              />
              <br />
              Instância de Teste:{' '}
              <CountUp
                className="font-bold"
                start={0}
                end={aux.instancias_teste}
                duration={1}
                separator=","
              />
            </p>
          </>
        ))}

        {/* <p className="text-2xl font-bold">
          AUC
          <CountUp
            className="font-bold ml-1"
            start={0}
            end={safra.auc}
            duration={1}
            separator=","
          />{' '}
          e KS
          <CountUp
            className="font-bold ml-1"
            start={0}
            end={safra.ks}
            duration={1}
            separator=","
          />
        </p> */}
      </div>
    </Card>

    // <Card className={cx('card', 'card-results')}>
    //   <p className="text-base font-bold uppercase">{title}</p>
    //   {data?.data.map((safra, i) => {
    //     return (
    //       <p key={i} className="text-base">
    //         {safra.rotulo} <br />
    //         <p className="text-2xl font-bold">
    //           AUC
    // <CountUp
    //   className="font-bold ml-1"
    //   start={0}
    //   end={safra.auc}
    //   duration={1}
    //   separator=","
    // />{' '}
    //           e KS
    //           <CountUp
    //             className="font-bold ml-1"
    //             start={0}
    //             end={safra.ks}
    //             duration={1}
    //             separator=","
    //           />
    //         </p>
    //         <p>
    //           Instância de Treino:
    //           <CountUp
    //             className="font-bold ml-1"
    //             start={0}
    //             end={safra.instancias_treino}
    //             duration={1}
    //             separator=","
    //           />
    //         </p>
    //         <p>
    //           Instância de Teste:
    //           <CountUp
    //             className="font-bold ml-1"
    //             start={0}
    //             end={safra.instancias_teste}
    //             duration={1}
    //             separator=","
    //           />
    //         </p>
    //       </p>
    //     );
    //   })}
    // </Card>
  );
}

export default ResultCrop;
