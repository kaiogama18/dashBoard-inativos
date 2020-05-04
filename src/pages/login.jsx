import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../components';
import { useFormik } from 'formik';
import Router from 'next/router';
import Rota from '../Routes/Rota';
import { login } from '../utils/auth';


const loginUser = 'Informe seu e-mail:';
const loginPassword = 'Informe sua senha:';
const loginBtn = 'Entrar';
const loginRegister = 'Fazer o cadastro agora';
const registerTitle = 'Faça login na sua conta';


export default () => {
  const route = '/login/usuario';

  const handleSubmit = async (param) => {
    try {
      const { code, menssage, data } = await Rota({ route, param });
      if (code === 200) {
        await login({ token: data[0].cpf });
      } else {
        alert(menssage)
      }
    } catch (error) {
      alert("Sem Coneção")
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: ''
    },
    onSubmit: param => {
      handleSubmit(param)
    },
  });

  return (
    <>
      <section className="login-register">
        <form onSubmit={formik.handleSubmit}>
          <p className="login-register-title">{registerTitle}</p>
          <label>{loginUser}</label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />

          <label>{loginPassword}</label>
          <div className="relative bg-gray-300 rounded">
            <input
              name="senha"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.senha}
            />
            <div className="login-password">
              <a className="text-gray-900 underline">Esqueceu a senha?</a>
            </div>
          </div>

          <Button type="submit">{loginBtn}</Button>
          <Link href="/cadastro">
            <a>{loginRegister}</a>
          </Link>
        </form>
      </section>
    </>
  );
};
