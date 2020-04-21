import useSWR from 'swr';
import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

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
    <div className="overflow-hidden p-5 bg-blue-600 text-white shadow-sm rounded-md">
      <p className="text-base font-bold uppercase">{title}</p>
      {data?.data.map((safra) => {
        return (
          <p className="text-base">
            {safra.rotulo} <br />
            <a className="text-2xl font-bold">
              AUC {safra.auc} e KS {safra.ks}
            </a>
            <br />
            Instância de Treino:{' '}
            <a className="font-bold">{safra.instancias_treino}</a> <br />
            Instância de Teste:{' '}
            <a className="font-bold">{safra.instancias_teste}</a>
          </p>
        );
      })}
    </div>
  );
}

class TrainingResults extends React.Component {
  render() {
    return <Results safra={this.props.safra} />;
  }
}

export default TrainingResults;
