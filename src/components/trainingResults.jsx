import useSWR from "swr";

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function TrainingResults() {
  const route = "result";
  const key = "201803";
  const { data, error } = useSWR(
    "/api/api_inativo?route=" + route + "&key=" + key,
    fetcher
  );
  console.log("[Leprs] -- TrainingResults: ", data);
  let title = data?.menssage;
  let safra = data?.data[0]
  if (!data) title, safra = "Carregando...";
  if (error) title, safra = "sem internet";
  return (
    <div className="shadow rounded-md p-6 bg-blue-600 text-white uppercase mb-4">
      <p className="text-base font-bold uppercase">
        {title}
      </p>
      <p className="text-base">
        {safra.rotulo} <br />
        <a className="text-2xl font-bold">
          AUC {safra.auc} e KS {safra.ks}
        </a>
        <br />
        Instância de Treino:{" "}
        <a className="font-bold">{safra.instancias_treino}</a> <br />
        Instância de Teste:{" "}
        <a className="font-bold">{safra.instancias_teste}</a>
      </p>
    </div>
  );
}

export default TrainingResults;
