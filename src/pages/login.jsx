import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import Rota from '../Routes/Rota';
import { login } from '../utils/auth';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import * as Yup from "yup";


export default () => {
  const route = '/login/usuario';
  const [loading, setLoading] = useState(false)

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('email invalido')
      .required('Obrigatório'),
  });

  const handleSubmit = async (param) => {
    setLoading(true)
    try {
      const { code, menssage, data } = await Rota({ route, param });
      if (code === 200) {
        await login({ token: data[0].cpf });
        // setLoading(false)
      } else {
        alert(menssage)
        setLoading(false)
      }
    } catch (error) {
      alert("Sem Coneção")
      setLoading(false)

    }
  }

  const formik = useFormik({
    initialValues: {
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

      <form onSubmit={formik.handleSubmit} >
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="Logo Buritech"
          />
        </div>

        <TextField
          label="E-mail *"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          defaultValue="Normal"
          variant="filled"
          error={formik.errors.email ? true : false}
          helperText={formik.errors.email ? formik.errors.email : false}
        />
        <div className="mt-5">
          <TextField
            label="Senha"
            name="senha"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.senha}
            defaultValue="Normal"
            variant="filled"
          />
        </div>
        <div>
          <Button variant="contained" size="large" color="primary" type="submit" disabled={loading} >
            {loading ? <><CircularProgress size={24} /> </> : <>{loginBtn}</>}
          </Button>
        </div>


        <Link href="/cadastro">
          <a>{loginRegister}</a>
        </Link>

      </form>
    </section>
  );
};



const loginUser = 'Informe seu e-mail:';
const loginPassword = 'Informe sua senha:';
const loginBtn = 'Entrar';
const loginRegister = 'Fazer o cadastro agora';
const registerTitle = 'Faça login na sua conta';
