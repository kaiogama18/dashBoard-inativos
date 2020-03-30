import { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class Harvest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
          {
            label: "Inativos",
            backgroundColor: "rgba(255,0,255,0.75)",
            data: [4, 5, 1, 10, 32, 2, 12]
          },
          {
            label: "Ativos",
            backgroundColor: "rgba(0,255,255,0.75)",
            data: [14, 15, 21, 0, 12, 24, 2]
          }
        ]
      }
    };
  }

  setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    console.log("[Leprs] -- api:" , ctx)
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.95, "rgba(0,127,255,0.85");
    return gradient;
  };

  getChartData = canvas => {
    const data = this.state.data;
    if (data.datasets) {
      let colors = ["rgba(0,0,255,0.8)", "rgba(0,0,255)"];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas, colors[i]);
        set.borderColor = "white";
        set.borderWidth = 2;
      });
    }

    return data;
  };

  render() {
    return (
      <div className="bar-char grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 col-span-2 rounded-md overflow-hidden shadow bg-white p-6">
        <div className="flex-col self-center">
          <p className="text-base uppercase">Selecione sua Safra</p>
          <p className="text-sm">
            Delize o botão para selecionar o ano e <br />
            clique no mês correspondente
          </p>
        </div>
        <div className="col-span-2">
          <Bar
            options={{
              legend: {
                display: false
              },
              responsive: true
            }}
            data={this.getChartData}
          />
        </div>
      </div>
    );
  }
}
