function TrainingResults({ posts }) {
    console.log(posts)
  return (
    <div className="shadow rounded-md p-6 bg-blue-600 text-white uppercase mb-4">
      <p className="text-base font-bold uppercase">
        s
      </p>
      <p className="text-base">
        s <br />
        <a className="text-2xl font-bold">
          AUC s e KS s
        </a>
        <br />
        Instância de Treino:{" "}
        <a className="font-bold">s</a> <br />
        Instância de Teste:{" "}
        <a className="font-bold">s</a>
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
    const posts = await res.json()
    return {
      props: {
        posts,
      },
    }
  }
export default TrainingResults;
