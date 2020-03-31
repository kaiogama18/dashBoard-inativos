import React from "react";
import { Router } from "next/router";
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import getHost from "../utils/get-host";
import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Graphic from "../components/Graphic";
import Harvest from "../components/Harvest";
import HorizontalBarComponents from "../components/HorizontalBarComponents";
import ConfusionMatrixComponents from "../components/ConfusionMatrixComponents";
import response_features from "../data/response_features.json";
import response_dados_safra from "../data/response_dados_safra";
import MixedChart from "../components/MixedChart";

const Index = props => {
  const { avatarUrl } = props.data;
  const safra = response_dados_safra.data[0];
  return (
    <Layout>
      <div className="bg-gray-100 p-6">
        <Navbar data={avatarUrl} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 py-4">
          <Harvest />
          <div className="flex flex-col justify-center rounded-md overflow-hidden shadow bg-white p-6 bg-blue-600 text-white">
            <p className="text-base font-bold uppercase text-center">
              {response_dados_safra.menssage}
            </p>
            <p className="text-base uppercase text-center">
              {safra.rotulo} <br />
              <a className="text-2xl font-bold text-center">
                AUC {safra.auc} e KS {safra.ks}
              </a>
            </p>
            <p className="text-base my-2">
              Instância de Treino:{" "}
              <a className="font-bold">{safra.instancias_treino}</a> <br />
              Instância de Teste:{" "}
              <a className="font-bold">{safra.instancias_teste}</a>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 py-4 ">
          <HorizontalBarComponents api={response_features} />
          <Graphic />
          <Graphic />
        </div>
        <div className="grid grid-cols-2 gap-4 py-4 ">
          <ConfusionMatrixComponents api={response_features} />
          <MixedChart />
          
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async ctx => {
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
        Authorization: JSON.stringify({ token })
      }
    });

    if (response.ok) {
      const js = await response.json();
      console.log("[Leprs] -- js: ", js);
      return js;
    } else {
      return await redirectError();
    }
  } catch (error) {
    return redirectError();
  }
};
export default withAuthSync(Index);
