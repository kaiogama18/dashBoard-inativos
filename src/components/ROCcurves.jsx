import { Component } from "react";
import { Line } from "react-chartjs-2";
import useSWR from "swr";
import PropTypes from "prop-types";
import React from "react";

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Plot(props) {
  const route = "roc_curve";
  const { data, error } = useSWR(
    "/api/api_inativo?route=" + route + "&key=" + props.safra,
    fetcher
  );
  const feature = [];
  const valor = [];
  let title = data?.menssage;
  if (!data) title = "Carregando...";
  if (error) title = "TOP FEATURES DO TREINO";
  let objs = [];
  data?.data.map((aux) => {
    objs = JSON.parse(aux.json.replace(/'/g, '"'));
  });

  const state = {
    data: {
      labels: ["0.0", "0.2", "0.4", "0.6", "0.8", "1.0"],
      datasets: [
        {
          label: "Taxa de Inadimplência",
          backgroundColor: "rgba(249, 142, 28,0.75)",
          borderColor: "#ea6227",
          data: objs.x_0,
          lineTension: 0.9,
          fill: false,
        },
        {
          label: "y_0",
          borderColor: "#ff56ff",
          data: objs.y_0,
          borderDash: [8, 4],
          lineTension: 0.9,
          fill: false,
        },
        {
          label: "x_1",
          borderColor: "#1236f9",
          borderDash: [8, 4],
          data: objs.x_1,
          lineTension: 0.9,
          fill: false,
        },
        {
          label: "y_1",
          borderColor: "#62bb6d",
          data: objs.y_1,
          lineTension: 0.9,
          fill: false,
        },
      ],
    },
  };

  return (
    <div className="self-start rounded-md overflow-hidden shadow bg-white p-6">
      <p className="text-base uppercase">{title}</p>
      <p className="text-sm font-bold">Safra: {props.safra}</p>
      <br />
      <Line
        options={{
          legend: {
            display: false,
          },
          responsive: true,
        }}
        data={state.data}
      />
    </div>
  );
}

class ROCcurves extends React.Component {
  render() {
    return <Plot safra={this.props.safra} />;
  }
}

// ROCcurves.propTypes = {
//   props: PropTypes.string.isRequired,
// };

export default ROCcurves;
