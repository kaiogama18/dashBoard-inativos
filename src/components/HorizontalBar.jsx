import { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

class HorizontalBarComponents extends Component {
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       data: {
  //         labels: ["1", "2", "3", "4", "5"],
  //         datasets: [
  //           {
  //             label: "Inativos",
  //             backgroundColor: "rgba(255,0,255,0.75)",
  //             data: [4, 5, 1, 10, 32, 2, 12]
  //           },
  //           {
  //             label: "Ativos",
  //             backgroundColor: "rgba(0,255,255,0.75)",
  //             data: [14, 15, 21, 0, 12, 24, 2]
  //           }
  //         ]
  //       }
  //     };
  //   }

  //   setGradientColor = (canvas, color) => {
  //     const ctx = canvas.getContext("2d");
  //     console.log("[Leprs] -- api:", ctx);
  //     const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  //     gradient.addColorStop(0, color);
  //     gradient.addColorStop(0.95, "rgba(0,127,255,0.85");
  //     return gradient;
  //   };

  //   getChartData = canvas => {
  //     const data = this.state.data;
  //     if (data.datasets) {
  //       let colors = ["rgba(0,0,255,0.8)", "rgba(0,0,255)"];
  //       data.datasets.forEach((set, i) => {
  //         set.backgroundColor = this.setGradientColor(canvas, colors[i]);
  //         set.borderColor = "white";
  //         set.borderWidth = 2;
  //       });
  //     }

  //     return data;
  //   };

  render() {
    const { api } = this.props;
    console.log("[Leprs]  --> Type: Api => ", typeof(api))
    api.map(postDetail => {
        // console.log("[Leprs]  --> Type: postDetail => ", typeof(postDetail))
        // console.log("[Leprs]  --> Type: postDetail.feature => ", typeof(postDetail.feature))
        // console.log("[Leprs]  --> Type: postDetail.data => ", typeof(postDetail.data))
        postDetail.data.map(aux => {
        console.log("[Leprs]  --> aux.feature dasdasd ", aux.valor)

            this.state = {
                data: {
                  labels: aux.feature,
                  datasets: [
                    {
                      backgroundColor: "rgba(255,0,255,0.75)",
                      data: [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14, 15]
                    }
                  ]
                }
              };
        })

     
    });

    return (
      <>
        {api.map(postDetail => {
          return (
            <div className="rounded-md overflow-hidden shadow bg-white p-6">
              <p className="text-base uppercase">{postDetail.menssage}</p>
              {console.log("[Leprs]  --> Type: postDetail.feature xxxx ", typeof(postDetail.menssage))}
              {console.log("[Leprs]  --> Type: postDetail.data xxxx ", typeof(postDetail.data[1].feature))}
              {postDetail.data.map(aux => {
                  return  console.log("[Leprs]  --> Type: postDetail.data yyyyy ", typeof(aux.feature))
              })}

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
        })}
      </>
    );
  }
}

export default HorizontalBarComponents;
