import FeaturePlot from "./featurePlot";
import KsPlot from "./ksPlot";
import ROCcurves from "./ROCcurves";
import MixedChart from "./MixedChart";
import ConfusionPlot from "./confusionPlot";
import TrainingResults from "./trainingResults";
import useSWR from "swr";
function fetcher(url) {
  return fetch(url).then((r) => r.json());
}
function handleInput(el) {
  console.log("============ OnClick: ===> :", el.target.value);
  const kay_safra = el.target.value;
  return <div> {kay_safra}</div>;
}





function shoot(el) {
  alert("Safra: "+ el.target.value);
}

function Crop() {
  const { data, error } = useSWR("/api/inativo", fetcher);
  let title = data?.menssage;
  let safra = [];
  data?.data.map((aux) => {
    safra.push(aux.safra);
  });
  if (!data) title = "Carregando...";
  if (error) title = "Selecione sua Safra";
  const auxSafra = 201803;
  return (
    <div className="grid grid-cols-3 py-4 gap-4">
      <div className="grid grid-cols-1 xl:grid-cols-3 col-span-2 rounded-md overflow-hidden shadow bg-white p-6">
        <div className="flex-col self-center">
          <p className="text-xl uppercase">{title}</p>
          <p className="text-sm">
            Delize o botão para selecionar o ano e <br />
            clique no mês correspondente
          </p>
        </div>
        <div className="grid grid-cols-12 flex justify-center m-1 col-span-2 ">
          {safra.map((name) => {
            return (
              <div className="m-1 flex flex-col items-center">
                <p className="text-xs text-blue-800 font-bold mb-3">{name}</p>
                <button
                  className="bg-blue-default h-full overflow-hidden shadow-lg w-4 rounded-md hover:bg-yellow-400"
                  // onClick={handleInput}
                  onClick={shoot}
                  value={name}
                />
              </div>
            );
          })}
        </div>
      </div>

      <TrainingResults safra={auxSafra} />
      <div className="grid grid-cols-2 col-span-2 gap-4">
        <FeaturePlot safra={auxSafra} />
        <KsPlot safra={auxSafra} />
        <ROCcurves safra={auxSafra} />
        <MixedChart safra={auxSafra} />
      </div>
      <ConfusionPlot safra={auxSafra} />
    </div>
  );
}

class SelectCrop extends React.Component {
  // handleClick = () => {
  //   this.props.onHeaderClick(this.props.value);
  // };

  render() {
    return <Crop />;
  }
}

export default SelectCrop;
