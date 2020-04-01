import { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

class HorizontalBarComponents extends Component {
  render() {
    const { api } = this.props;
    const feature = [];
    const valor = [];
    api.map(postDetail => {
      postDetail.data.map(aux => {
        feature.push(aux.feature);
        valor.push(aux.valor);
      });
    });

    this.state = {
      data: {
        labels: feature,
        datasets: [
          {
            backgroundColor: "rgba(255,0,255,0.75)",
            data: valor
          }
        ]
      }
    };

    return api.map(postDetail => {
      return (
        <div className="rounded-md overflow-hidden shadow bg-white p-6 py-4">
          <p className="text-base uppercase">{postDetail.menssage}</p>
          <p className="text-sm font-bold">Safra: {postDetail.data[1].safra}</p>
          <HorizontalBar
            options={{
              legend: {
                display: false
              },
              responsive: true
            }}
            data={this.state.data}
          />
        </div>
      );
    });
  }
}

export default HorizontalBarComponents;
