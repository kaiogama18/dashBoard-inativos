import React, { Component } from "react";
import {
  HeatMapComponent,
  Inject,
  Legend,
  Tooltip,
  Adaptor
} from "@syncfusion/ej2-react-heatmap";

class ConfusionMatrixComponents extends React.Component {
  constructor() {
    super(...arguments);
    this.heatmapData = [
      [0.21, 0.32],
      [0.79, 0.68]
    ];
  }

  render() {
    return (
      <div className="rounded-md overflow-hidden shadow bg-white p-6">
        <p className="text-base uppercase">Valores Matrix de Confusão</p>
        <p className="text-sm font-bold">Safra: 201802</p>
        <HeatMapComponent
          id="heatmap"
          xAxis={{
            valueType: "Category",
            labels: ["0", "1"]
          }}
          yAxis={{
            valueType: "Category",
            labels: ["1", "0"]
          }}
          dataSource={this.heatmapData}
        >
          <Inject services={[Adaptor, Legend, Tooltip]} />
        </HeatMapComponent>
      </div>
    );
  }
}

export default ConfusionMatrixComponents;
