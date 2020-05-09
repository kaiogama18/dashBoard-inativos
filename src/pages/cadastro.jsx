import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import Router from 'next/router';
import Rota from '../Routes/Rota';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import * as Yup from "yup";


export default () => {
  const route = '/login/usuario/cadastro';
  const [loading, setLoading] = useState(false)

  const SignupSchema = Yup.object().shape({
    nome: Yup.string()
      .required('Obrigatório'),
    email: Yup.string()
      .email('email invalido')
      .required('Obrigatório'),
    senha: Yup.string()
      .min(8, 'Curto demais!')
      .required('Obrigatório'),
    cpf: Yup.string()
      .min(8, 'Curto demais!')
      .required('Obrigatório'),
  });

  const handleSubmit = async (param) => {
    setLoading(true)
    try {
      const { code, menssage } = await Rota({ route, param });
      if (code === 200) {
        alert(menssage);
        setLoading(false)

        Router.push('/login');
      } else {
        setLoading(false)
        alert(menssage)
      }
    } catch (error) {
      setLoading(false)
      alert("Sem Coneção")
    }
  }

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      email: '',
      senha: ''
    },
    validationSchema: SignupSchema,
    onSubmit: param => {
      handleSubmit(param)
    },
  });

  return (
    <section className="login-register">
      <form onSubmit={formik.handleSubmit}>
        <p className="text-2xl uppercase font-bold mb-5">{registerTitle}</p>
        <TextField
          label="Nome *"
          name="nome"
          type="text"
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.nome}
          error={formik.errors.nome ? true : false}
          helperText={formik.errors.nome ? formik.errors.nome : false}
        />

        <div className="mt-5">
          <TextField
            label="E-mail *"
            name="email"
            type="email"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email ? true : false}
            helperText={formik.errors.email ? formik.errors.email : false}
          />
        </div>

        <div className="mt-5">
          <TextField
            label="Cpf *"
            name="cpf"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.cpf}
            error={formik.errors.cpf ? true : false}
            helperText={formik.errors.cpf ? formik.errors.cpf : false}
          />
        </div>


        <div className="mt-5">
          <TextField
            label="Senha *"
            name="senha"
            type="password"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.senha}
            error={formik.errors.senha ? true : false}
            helperText={formik.errors.senha ? formik.errors.senha : "Use 8 ou mais caracteres"}
          />
        </div>


        <Button variant="contained" size="medium" type="submit" color="primary" startIcon={loading && <CircularProgress size={24} />} disabled={loading} >
          {loading ? <>Enviando</> : <>{registerBtn}</>}
        </Button>

        <Link href="/login">
          <a>{registerLoginRegister}</a>
        </Link>
      </form>
    </section>
  );
};


const registerBtn = 'Cadastrar';
const validade = 'confirme sua senha';
const registerTitle = 'Crie sua Conta';
const registerUser = 'Informe seu usuário:';
const registerPassword = 'Informe sua senha:';
const caracteres = 'Use oito ou mais caracteres';
const registerLoginRegister = 'Faça login em vez disso';

