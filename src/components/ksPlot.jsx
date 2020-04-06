import { Component } from "react";
import useSWR from "swr";
import { HorizontalBar, Line } from "react-chartjs-2";

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

// chartRef = React.createRef();

// function componentDidMount({ prop }) {
//   const ctx = this.chartRef.current.getContext("2d");

//   new Chart(ctx, {
//     type: "bar",
//     data: {
//       labels: ["0.0", "0.2", "0.4", "0.6", "0.8", "1.0"],
//       datasets: [
//         {
//           type: "line",
//           borderColor: "#ded714",
//           data: [0, 0, 12, 24, 100, 300],
//           fill: false,
//         },
//         {
//           type: "line",
//           borderColor: "#5b9bd8",
//           data: [0, 0, 60, 90, 150, 300],
//           lineTension: 0.9,
//           fill: false,
//         },
//         {
//           type: "line",
//           borderColor: "#000",
//           data: [0, 0, 60, 0],
//           borderDash: [8, 4],
//           fill: false,
//         },
//       ],
//     },
//     options: {
//       title: {
//         display: false,
//       },
//       legend: { display: false },
//     },
//   });
// }

function KsPlot({ prop }) {
  const route = "top_features";
  const { data, error } = useSWR(
    "/api/api_inativo?route=" + route + "&key=" + prop,
    fetcher
  );
  const feature = [];
  const valor = [];
  let title = data?.menssage;
  if (!data) title = "Carregando...";
  if (error) title = "TOP FEATURES DO TREINO";

  data?.data.map((aux) => (feature.push(aux.feature), valor.push(aux.valor)));

  const state = {
    data: {
      // labels: feature,
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
          borderColor: "#0a2cd1",
          backgroundColor: "rgba(3, 45, 255,0.75)",
          data: [0, 0, 60, 90, 150, 300],
          lineTension: 0.9,
          fill: false,
        },
      ],
    },
  };

  return (
    <div className="self-start rounded-md overflow-hidden shadow bg-white p-6">
      <p className="text-base uppercase">{title}</p>
      <p className="text-sm font-bold">Safra: {data?.data[1].safra}</p>
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

export default KsPlot;
