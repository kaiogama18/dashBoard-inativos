import { Component } from "react";

class MixedChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const ctx = this.chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["[0,10]", "[10,20]", "[20,30]", "[30,40]", "[40,50]", "[50,60]", "[60,70]", "[70,80]", "[80,90]", "[90,100]"],
        datasets: [
          {
            label: "Africa",
            type: "line",
            borderColor: "#de1414",
            borderDash: [8, 4],
            data: [0.00, 0.00, 0.00, 2.49, 2.41, 17.45, 15.19, 16.27, 17.52, 5.63],
          },
          {
            label: "Africa",
            type: "bar",
            backgroundColor: "rgba(49, 130, 206,0.8)",
            backgroundColorHover: "#3e95cd",
            data: [0.00, 0.00, 0.50, 8.79, 19.06, 17.45, 15.19, 16.27, 17.52, 5.63]
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
        <p className="text-base uppercase">Faixas de Scores</p>
        <p className="text-sm font-bold">Safra: 201802</p>
        <br/> 

        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default MixedChart;
