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
import response_features from "../data/response_features.json";

const Index = props => {
  const { avatarUrl } = props.data;
  return (
    <Layout>
      <div className="bg-gray-100 w-full p-6">
        <Navbar data={avatarUrl} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 py-4">
          <Harvest />
          <div className="metrics rounded-md overflow-hidden shadow bg-white p-6 bg-blue-600 text-white">
            <p className="text-bae uppercase">
              Backtest 2018/02 - LGBM-Tuned-nf:
            </p>
            <p className="text-2xl font-bold text-center">
              {" "}
              AUC 74.03 e KS 37.61
            </p>
            <p className="text-base my-2">
              Treino com 3496 instância: 88.42% bons / 11.58 maus pagadores
            </p>
            <p className="text-base my-2">
              Teste com 3718 instância: 90.02% bons / 9.98 maus pagadores
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 py-4 ">
          <HorizontalBarComponents api={response_features} />
          <Graphic />
          <Graphic />
          <Graphic />
          <Graphic />
          <Graphic />
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
