import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { login } from '../utils/auth';
import Link from 'next/link';

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

  return (
    <div className="flex content-center flex-wrap justify-center h-screen bg-blue-500 ">
      <form
        className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg bg-white card p-6"
        onSubmit={handleSubmit}
      >
        <img className="self-center" src="/logo.png" />
        <div className="flex flex-col px-6 py-4">
          <lable className="ext-base my-2">
            Informe seu usuário do github:
          </lable>
          <input
            className="rounded inline-block  bg-gray-300 px-2 py-2"
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
        </div>
        <div class="flex flex-col px-6 py-4">
          <button
            className="bg-blue-600  text-white font-bold py-2 px-4 my-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Conectar
          </button>
          <Link href="/cadastro">
            <a className="text-blue-600 hover:text-blue-700 self-center my-2">
              Fazer o cadastro agora
            </a>
          </Link>
        </div>

        {userData.error && (
          <p className="text-red-700 self-center my-2">
            Error: {userData.error}{' '}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
