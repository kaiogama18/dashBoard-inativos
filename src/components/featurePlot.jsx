import { HorizontalBar } from "react-chartjs-2";
import useSWR from "swr";

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function FeaturePlot({prop}) {
  const route = "top_features";
  const { data, error } = useSWR(
    "/api/api_inativo?route=" + route + "&key=" + prop,
    fetcher
  );
  const feature = [];
  const valor = [];
  let title = data?.menssage;
  if (!data) title = "Carregando...";
  if (error) title = "TOP FEATURES DO TREINO";

  data?.data.map((aux) => (feature.push(aux.feature), valor.push(aux.valor)));

  const state = {
    data: {
      labels: feature,
      datasets: [
        {
          backgroundColor: "rgba(49, 130, 206,0.75)",
          data: valor,
        },
      ],
    },
  };

  return (
    <div className="rounded-md overflow-hidden shadow bg-white p-6 py-4">
      <p className="text-base uppercase">{title}</p>
      <p className="text-sm font-bold">Safra: {data?.data[1].safra}</p>
      <HorizontalBar
        options={{
          legend: {
            display: false,
          },
          responsive: true,
        }}
        data={state.data}
      />
    </div>
  );
}

export default FeaturePlot;
