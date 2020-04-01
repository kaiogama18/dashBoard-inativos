import { Component } from "react";

class KStatistic extends Component {
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
            borderColor: "#ded714",
            data: [0, 0, 12, 24, 100, 300],
            fill: false
          },
          {
            type: "line",
            borderColor: "#5b9bd8",
            data: [0, 0, 60, 90, 150, 300],
            lineTension	: 0.9,
            fill: false
          },
          {
            type: "line",
            borderColor: "#000",
            data: [0, 0, 60,0],
            borderDash: [8, 4],
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
        <p className="text-base uppercase">KS Statistic Plot</p>
        <p className="text-sm font-bold">Safra: 201802</p>

        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default KStatistic;
