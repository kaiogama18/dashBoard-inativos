import response_dados_safra from "../data/response_dados_safra";

function TrainingResults({ posts }) {
  const safra = response_dados_safra.data[0];
  console.log(posts);
  return (
    <div className="shadow rounded-md p-6 bg-blue-600 text-white uppercase mb-4">
      <p className="text-base font-bold uppercase">
        {response_dados_safra.menssage}
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

export async function getStaticProps() {
  const res = await fetch(
    "https://inativos.appspot.com/home/safras/top_features",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ safra: "201803" }),
    }
  );
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}
export default TrainingResults;
