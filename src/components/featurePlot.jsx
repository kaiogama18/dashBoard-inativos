import { HorizontalBar } from "react-chartjs-2";
import useSWR from "swr";
import PropTypes from "prop-types";
import React from "react";

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Plot(props) {
  const route = "top_features";
  const { data, error } = useSWR(
    "/api/api_inativo?route=" + route + "&key=" + props.safra,
    fetcher
  );
  let feature = [];
  let valor = [];
  let title = data?.menssage;
  if (!data) title = "Carregando...";
  if (error) title = "TOP FEATURES DO TREINO";
  data?.data.map((aux) => (feature.push(aux.feature), valor.push(aux.valor)));

  let dataArray = valor;
  let dataIndexes = dataArray.map((d, i) => i);
  dataIndexes.sort((a, b) => {
    return dataArray[a] - dataArray[b];
  });
  dataArray.sort((a, b) => a - b);
  let newMeta = [];
  let newLabels = [];
  data?.data.forEach((bar, i) => {
    let newIndex = dataIndexes.indexOf(i);
    newMeta[newIndex] = bar;
    newLabels[newIndex] = feature[i];
  });
  feature = newLabels;

  function randomColorFactor() {
    return Math.round(Math.random() * 255);
  }
  function randomColor(opacity) {
    return (
      "rgba(" +
      randomColorFactor() +
      "," +
      randomColorFactor() +
      "," +
      randomColorFactor() +
      "," +
      (opacity || ".3") +
      ")"
    );
  }

  var canvas = document.createElement("canvas");
  window.ctx = canvas.getContext("2d");

  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, "#80b6f4");
  gradientStroke.addColorStop(1, "#f49080");

  var config = {
    type: "line",
    data: {
      labels: feature.reverse(),
      datasets: [
        {
          label: "Importância",
          data: valor.reverse(),
          fill: false,
          borderDash: [5, 5],
          backgroundColor:  [
            "rgba(196, 37, 125, 0.75)",
            "rgba(255, 99, 132, 100)",
            "rgba(255, 91, 25, 0.75)",
            "rgba(54, 162, 235, 0.75)",
            "rgba(255, 206, 86, 0.75)",
            "rgba(75, 192, 192, 0.75)",
            "rgba(153, 102, 255, 0.75)",
            "rgba(255, 159, 64, 0.75)",
            "rgba(255, 99, 132, 0.75)",
            "rgba(54, 162, 235, 0.75)",
            "rgba(255, 206, 86, 0.75)",
            "rgba(75, 192, 192, 0.75)",
            "rgba(153, 102, 255, 0.75)",
            "rgba(255, 159, 64, 0.75)",
            "rgba(48, 255, 210, 0.75)",
          ],
        },
      ],
    },
  };

  config.data.datasets.forEach(function (dataset) {
    dataset.borderColor = randomColor(1);
    // dataset.backgroundColor = gradientStroke;
    dataset.pointBorderColor = randomColor(0.7);
    dataset.pointBackgroundColor = randomColor(0.5);
    dataset.pointBorderWidth = 1;
  });

  return (
    <div className="rounded-md overflow-hidden  bg-white p-6 py-4">
      <p className="text-base uppercase">{title}</p>
      <p className="text-sm font-bold">Safra: {props.safra}</p>
      <br />
      <HorizontalBar
        options={{
          responsive: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
        data={config.data}
      />
    </div>
  );
}

class FeaturePlot extends React.Component {
  render() {
    return <Plot safra={this.props.safra} />;
  }
}

// FeaturePlot.propTypes = {
//   props: PropTypes.string.isRequired,
// };

export default FeaturePlot;
