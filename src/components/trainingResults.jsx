import useSWR from 'swr';
import PropTypes from 'prop-types';
import React from 'react';
import CountUp from 'react-countup';
import Card from './Cards/Card';
import cx from 'classnames';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Results(props) {
  const route = 'result';
  const { data, error } = useSWR(
    '/api/api_inativo?route=' + route + '&key=' + props.safra,
    fetcher,
  );
  let title = data?.menssage;
  if (!data) title = 'Carregando...';
  if (error) title = 'sem internet';
  return (
    <Card className={cx('card', 'card-results')}>
      <p className="text-base font-bold uppercase">{title}</p>
      {data?.data.map((safra) => {
        return (
          <p className="text-base">
            {safra.rotulo} <br />
            <p className="text-2xl font-bold">
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
            </p>
            <p>
              Instância de Treino:
              <CountUp
                className="font-bold ml-1"
                start={0}
                end={safra.instancias_treino}
                duration={1}
                separator=","
              />
            </p>
            <p>
              Instância de Teste:
              <CountUp
                className="font-bold ml-1"
                start={0}
                end={safra.instancias_teste}
                duration={1}
                separator=","
              />
            </p>
          </p>
        );
      })}
    </Card>
  );
}

class TrainingResults extends React.Component {
  render() {
    return <Results safra={this.props.safra} />;
  }
}

export default TrainingResults;
