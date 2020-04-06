import useSWR from "swr";
import PropTypes from "prop-types";
import React from 'react'

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Results(props) {
  const route = "result";
  const { data, error } = useSWR(
    "/api/api_inativo?route=" + route + "&key=" + props.safra,
    fetcher
  );
  // console.log("[Leprs] -- TrainingResults: ", data);
  let title = data?.menssage;
  if (!data) title = "Carregando...";
  if (error) title = "sem internet";
  return (
    <div className="shadow rounded-md p-6 bg-blue-default text-white uppercase">
      <p className="text-base font-bold uppercase">{title}</p>
      {data?.data.map((safra) => {
        return (
          <p className="text-base mb-2">
            {safra.rotulo} <br />
            <a className="text-2xl font-bold">
              AUC {safra.auc} e KS {safra.ks}
            </a>
            <br />
            Instância de Treino:{" "}
            <a className="font-bold">{safra.instancias_treino}</a> <br />
            Instância de Teste:{" "}
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

TrainingResults.propTypes = {
  props: PropTypes.string.isRequired,
};

export default TrainingResults;
