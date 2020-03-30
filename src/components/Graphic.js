import { Component } from "react";
import { Line } from "react-chartjs-2";

export default class Graphic extends Component {
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

        }

    }

    setGradientColor = (canvas, color) => {
        const ctx = canvas.getContext('2d')
        const gradient = ctx.createLinearGradient(0,0,0,400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.95, "rgba(133,255,144,0.85");
        return gradient;
    }

    getChartData = canvas => {
        const data = this.state.data;
        if(data.datasets) {
            let colors = ["rgba(255,0,255,0.75)", "rgba(0,255,0,0.75)"]
            data.datasets.forEach((set,i) => {
                set.backgroundColor = this.setGradientColor(canvas, colors[i]);
                set.borderColor = "white";
                set.borderWidth = 2;
            });
        }

        return data;

    }

    render() {
        return (
            <div className="max-w-sm rounded-md overflow-hidden shadow bg-white p-3">
                <p className="text-base uppercase">Safra: 2018 de Agosto </p>
                <p className="text-sm">Detalhes dos experimentos</p>
                <Line options={{
                    responsive: true
                }}
                    data={this.getChartData}
                />
            </div>
        )
    }
}