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
  let key = el.target.value;
  return key;
}

function SelectCrop() {
  const { data, error } = useSWR("/api/inativo", fetcher);
  let title = data?.menssage;
  let safra = [];
  data?.data.map((aux) => {
    safra.push(aux.safra);
  });
  if (!data) title = "Carregando...";
  if (error) title = "Selecione sua Safra";

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
                  className="bg-blue-500 h-full w-4 rounded-md hover:bg-yellow-400"
                  onClick={handleInput}
                  value={name}
                />
              </div>
            );
          })}
        </div>
      </div>
      <TrainingResults prop={"201803"} />
      <div className="grid grid-cols-2 col-span-2 gap-4">
        <FeaturePlot />
        <KsPlot />
        <ROCcurves />
        <MixedChart />
      </div>
      <ConfusionPlot />
    </div>
  );
}

export default SelectCrop;
