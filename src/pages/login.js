import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import { login } from "../utils/auth";
import Layout from "../components/Layout";

const Login = () => {
  const [userData, setUserData] = useState({ username: "", error: "" });
  const handleSubmit = async event => {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: "" }));

    const username = userData.username;
    const url = "api/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      if (response.status === 200) {
        const { token } = await response.json();
        await login({ token });
      } else {
        console.log("[Leprs]  -- login failed");
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error("[Leprs] -- Error :( --> ", error);

      const { response } = error;
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      );
    }
  };

  return (
      <div className="login-page">
        <form className="card" onSubmit={handleSubmit}>
          <img src="/logo.png" />
          <div className="flex flex-col px-6 py-4">
            <lable>Informe seu nome ou e-mail:</lable>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={event =>
                setUserData(
                  Object.assign({}, userData, { username: event.target.value })
                )
              }
            />
            <lable>Informe sua senha:</lable>
            <input type="password" disabled />
            <button className="hover:bg-blue-700" type="submit">
              Conectar
          </button>
            <a href="#" className="text-blue-600 hover:text-blue-700 self-center my-2" >
              Fazer o cadastro agora
          </a>
          </div>
          {userData.error && <p className="text-red-700 self-center my-2">Error: {userData.error} </p>}
        </form>
      </div>
  );
};

export default Login;
