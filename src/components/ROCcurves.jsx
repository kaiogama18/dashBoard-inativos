import { Component } from "react";

class ROCcurves extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const ctx = this.chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["0.0", "0.2", "0.4", "0.6", "0.8", "1.0"],
        datasets: [
          {
            type: "line",
            borderColor: "#000",
            data: [0, 100, 200, 300, 400, 500],
            borderDash: [8, 4],
            fill: false
          },
          {
            type: "line",
            borderColor: "#ff56ff",
            data: [0, 410, 450, 490, 499, 500],
            lineTension: 0.9,
            borderDash: [4],
            fill: false
          },
          {
            type: "line",
            borderColor: "#1236f9",
            data: [0, 310, 267, 464, 418, 500],
            borderDash: [8, 4],
            fill: false
          },
          {
            type: "line",
            borderColor: "#62bb6d",
            data: [0, 320, 300, 444, 408, 500],
            fill: false
          },
          {
            type: "line",
            borderColor: "#000",
            data: [0, 290, 340, 444, 488, 500],
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: false
        },
        legend: { display: false }
      }
    });
  }

  render() {
    return (
      <div className="self-start rounded-md overflow-hidden shadow bg-white p-6">
        <p className="text-base uppercase">AUC ROC Curves</p>
        <p className="text-sm font-bold">Safra: 201802</p>

        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default ROCcurves;
