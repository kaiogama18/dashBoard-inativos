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
      <div className="panel">
        <img src="https://buritech.com.br/site/logo.png"></img>
        <form className="formset" onSubmit={handleSubmit}>
          <div className="form-group">
            <lable className="form-label">Informe seu nome ou e-mail:</lable>
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
              className="form-control"
            />
          </div>
          <div class="form-group">
            <lable class="form-label">Informe sua senha:</lable>
            <input type="password" class="form-control" />
          </div>
          <p id="plogintoregister">Esqueci minha senha</p>
          <button type="submit" className="btn">
            Conectar
          </button>

          <p class="at" id="textchange">
            {" "}
            Fazer o cadastro agora
          </p>
          {userData.error && <p className="error">Error: {userData.error} </p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
