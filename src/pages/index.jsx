import fetch from "node-fetch";
import Layout from "../components/Layout";

import { Router } from "next/router";
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import getHost from "../utils/get-host";
import Navbar from "../components/Navbar";
import KStatistic from "../components/KStatistic";
import Harvest from "../components/Harvest";
import HorizontalBarComponents from "../components/HorizontalBarComponents";
import ConfusionMatrixComponents from "../components/ConfusionMatrixComponents";
import response_features from "../data/response_features.json";
import response_dados_safra from "../data/response_dados_safra";
import MixedChart from "../components/MixedChart";
import ROCcurves from "../components/ROCcurves";
import TrainingResults from "../components/trainingResults";

function Index({ props }) {
  // const { avatarUrl } = props.data;
  console.log("[LEPRS] ---> avatarUrl: ", props)
  const safra = response_dados_safra.data[0];
  return (
    <Layout>
      <div className="w-screen p-6">
        {/* <Navbar data={avatarUrl} /> */}
        <Navbar />

        <div className="grid grid-cols-3 py-4 gap-4">
          <Harvest />
          {/* <TrainingResults /> */}

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
          <div className="grid grid-cols-2 col-span-2 gap-4">
            <HorizontalBarComponents />
            <KStatistic />
            <ROCcurves />
            <MixedChart />
          </div>
          <ConfusionMatrixComponents api={response_features} />
        </div>
      </div>
    </Layout>
  );
}

Index.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  const apiUrl = getHost(ctx.req) + "api/profile";
  const redirectError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        Authorization: JSON.stringify({ token }),
      },
    });

    if (response.ok) {
      const js = await response.json();
      return js;
    } else {
      return await redirectError();
    }
  } catch (error) {
    return redirectError();
  }
};
export default withAuthSync(Index);
