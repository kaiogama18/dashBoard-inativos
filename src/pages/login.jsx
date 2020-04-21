import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { login } from '../utils/auth';
import Link from 'next/link';
import Button from '../components/Button';
import Card from '../components/Card';

const Login = () => {
  const [userData, setUserData] = useState({ username: '', error: '' });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUserData(Object.assign({}, userData, { error: '' }));

    const username = userData.username;
    const url = 'api/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      if (response.status === 200) {
        const { token } = await response.json();
        await login({ token });
      } else {
        console.log('[Leprs]  -- login failed');
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error('[Leprs] -- Error :( --> ', error);

      const { response } = error;
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message,
        }),
      );
    }
  };

  const loginUser = 'Informe seu usuário do github:';
  const loginBtn = 'Conectar';
  const loginRegister = 'Fazer o cadastro agora';

  return (
    <>
      <section className="login-register">
        <form onSubmit={handleSubmit}>
          <img src="/logo.png" />
          <label>{loginUser}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={(event) =>
              setUserData(
                Object.assign({}, userData, { username: event.target.value }),
              )
            }
          />

          {/* <lable>Informe sua senha:</lable>
          <input type="password" disabled />
          <div className="my-2">
            <input type="checkbox" defaultChecked />
            <lable className="mx-2">Esqueci minha senha</lable>
          </div> */}

          <Button type="submit">{loginBtn}</Button>
          <Link href="/cadastro">
            <a>{loginRegister}</a>
          </Link>
          {userData.error && <p className="alert">Error: {userData.error} </p>}
        </form>
      </section>
    </>
  );
};

export default Login;
