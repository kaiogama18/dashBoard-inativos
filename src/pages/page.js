import fetch from 'node-fetch'
import { HorizontalBar } from "react-chartjs-2";
function Blog({ posts }) {

  const feature = [];
  const valor = [];

  posts.data.map(aux => (
    feature.push(aux.feature),
    valor.push(aux.valor)
  ))
  const state = {
    data: {
      labels: feature,
      datasets: [
        {
          backgroundColor: "rgba(49, 130, 206,0.75)",
          data: valor
        }
      ]
    }
  };
  return (
    <div className="rounded-md overflow-hidden shadow bg-white p-6 py-4">
      <p className="text-base uppercase">{posts.menssage}</p>
      <p className="text-sm font-bold">Safra: {posts.data[1].safra}</p>
      <HorizontalBar
        options={{
          legend: {
            display: false
          },
          responsive: true
        }}
        data={state.data}
      />

    </div>
  )
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
export default Blog
















