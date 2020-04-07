import React, { Component } from "react";
import {
  HeatMapComponent,
  Inject,
  Legend,
  Tooltip,
  Adaptor,
} from "@syncfusion/ej2-react-heatmap";
import useSWR from "swr";
import PropTypes from "prop-types";

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Plot(props) {
  const route = "confusion_matrix";
  const { data, error } = useSWR(
    "/api/api_inativo?route=" + route + "&key=" + props.safras,
    fetcher
  );
  let title = data?.menssage;
  let ano = data?.data[0].safra;
  if (!data) title = "Carregando...";
  if (error) title = "Sem conexão com o servidor";

  let true_n = data?.data[0].true_negative;
  if (!data) true_n = "0.0";

  let false_p = data?.data[0].false_positive;
  if (!data) false_p = "0.0";

  let false_n = data?.data[0].false_negative;
  if (!data) false_n = "0.0";

  let true_p = data?.data[0].true_positive;
  if (!data) true_p = "0.0";

  return (
    <div className="self-start rounded-md overflow-hidden shadow bg-white p-6 ">
      <p className="text-base uppercase">{title}</p>
      <p className="text-sm font-bold">Safra: {ano}</p>
      <br />

      <HeatMapComponent
        id="heatmap"
        xAxis={{
          valueType: "Category",
          labels: ["0", "1"],
        }}
        yAxis={{
          valueType: "Category",
          labels: ["1", "0"],
        }}
        dataSource={[
          [true_n, false_p],
          [false_n, true_p],
        ]}
      >
        <Inject services={[Adaptor, Legend, Tooltip]} />
      </HeatMapComponent>
    </div>
  );
}

class ConfusionPlot extends React.Component {
  render() {
    return <Plot safras={this.props.safra} />;
  }
}

// ConfusionPlot.propTypes = {
//   props: PropTypes.string.isRequired,
// };

export default ConfusionPlot;
