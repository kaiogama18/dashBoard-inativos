import React from "react";
import { Router } from "next/router";
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import getHost from "../utils/get-host";
import fetch from "isomorphic-unfetch";

const Index = props => {
  const { name, login, avatarUrl } = props.data;
  return (
    <>
      <div class="area"></div>
      <img src={avatarUrl} alt="Avatar" />
      <h1>{name}</h1>
      <p>{login}</p>

      <nav class="main-menu">
        <ul>
          <li>
            <a>
              <i class="fa fa-home fa-2x"></i>
              <span class="nav-text">Carteira </span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

Index.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  const apiUrl = (getHost(ctx.req) + "api/profile");
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
