import useSWR from "swr";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

function Harvest() {
  const { data, error } = useSWR("/api/inativo", fetcher);
  console.log("[Leprs] -- json teste: ", data);
  let title = data?.menssage;
  let safra = [];
  data?.data.map(aux => {
    safra.push(aux.safra);
  });
  console.log("[Leprs] -- safra teste: ", safra);
  if (!data) title = "Carregando...";
  if (error) title = "Selecione sua Safra";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 col-span-2 rounded-md overflow-hidden shadow bg-white p-6">
      <div className="flex-col self-center">
        <p className="text-xl uppercase">{title}</p>
        <p className="text-sm">
          Delize o botão para selecionar o ano e <br />
          clique no mês correspondente
        </p>
      </div>
      <div className="grid grid-cols-12 flex justify-center m-1 col-span-2 ">
        {safra.map(name => {
          return (
            <div className="m-1 flex flex-col items-center">
              <p className="text-xs text-blue-800 font-bold mb-3">{name}</p>
              <button class="bg-blue-500 h-full w-4 rounded-md hover:bg-yellow-400" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Harvest;
