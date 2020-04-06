import { Component } from "react";
import PropTypes from "prop-types";
import useSWR from "swr";
import { Line } from "react-chartjs-2";

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Plot(props) {
  const route = "ks_curve";
  const { data, error } = useSWR(
    "/api/api_inativo?route=" + route + "&key=" + props.safra,
    fetcher
  );

  const feature = [];
  const valor = [];
  let title = data?.menssage;
  let ano = data?.data[0].safra;
  if (!data) title = "Carregando...";
  if (error) title = "Sem Coneção";


  const table = [];

  // data?.data.map(aux => (table.push(JSON.parse(aux.json))));

  // console.log("[Daniel Lepros ] ==> " + table)
  // const obj = JSON.parse(table)
  // console.log("[Saulo Lepros ] ==> " + obj.x_0)






  console.log(" dataaaaaa " + data?.data.data);

  data?.data.map((aux) => (feature.push(aux.feature), valor.push(aux.valor)));

  const state = {
    data: {
      labels: ["0.0", "0.2", "0.4", "0.6", "0.8", "1.0"],
      datasets: [
        {
          backgroundColor: "rgba(249, 142, 28,0.75)",
          borderColor: "#ea6227",
          data: [0, 0, 12, 24, 100, 300],
          fill: false,
        },
        {
          type: "line",
          borderColor: "#40a2cd1",
          backgroundColor: "rgba(3, 45, 255,0.75)",
          data: [0, 0, 60, 90, 150, 300],
          lineTension: 0.9,
          fill: false,
        },
      ],
      options: {
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "vertical",
              scaleID: "x-axis-0",
              value: "0.8",
              borderColor: "red",
              label: {
                content: "TODAY",
                enabled: true,
                position: "top",
              },
            },
          ],
        },
      },
    },
  };

  return (
    <div className="self-start rounded-md overflow-hidden shadow bg-white p-6">
      <p className="text-base uppercase">{title}</p>
      <p className="text-sm font-bold">Safra: {ano}</p>

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

class KsPlot extends React.Component {
  render() {
    return <Plot safra={this.props.safra} />;
  }
}

KsPlot.propTypes = {
  props: PropTypes.string.isRequired,
};

export default KsPlot;
