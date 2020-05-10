import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import Router from 'next/router';
import Rota from '../Routes/Rota';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import * as Yup from "yup";
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { AlertStatus } from '../components';




function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default () => {
  const route = '/login/usuario/cadastro';
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState([]);

  const SignupSchema = Yup.object().shape({
    nome: Yup.string()
      .required('Obrigatório'),
    email: Yup.string()
      .email('email invalido')
      .required('Obrigatório'),
    cpf: Yup.string()
      .min(8, 'Curto demais!')
      .required('Obrigatório'),
    senha: Yup.string()
      .required('Obrigatório')
      .min(8, 'Curto demais!')
      .matches(/[a-zA-Z]/, 'Informe uma Letra'),
    // confirmSenha: Yup.string()
    //   .required('Obrigatório')
    //   .test('Validado', 'As senhas devem ser iguais', function (value) {
    //     return senha === value;
    //   }),

  });

  const handleSubmit = async (param) => {
    setLoading(true)
    try {
      const { code, menssage } = await Rota({ route, param });
      if (code === 200) {
        // alert(menssage);
        setStatus({ menssage: menssage, status: true, code: code })
        setLoading(false)
        setTimeout(() => {
          Router.push('/login');
        }, 3000);
      } else {
        setStatus({ menssage: menssage, status: true, code: code })
        setLoading(false)
      }
    } catch (error) {
      // setLoading(false)
      setStatus({ menssage: "Sem Coneção", status: true, code: 400 })
      alert("Sem Coneção")
    }
  }

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      // confirmSenha: '',
    },
    validationSchema: SignupSchema,
    onSubmit: param => {
      // console.log(JSON.stringify(param, null, 2))
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
            InputProps={{
              inputComponent: TextMaskCustom,
            }}
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
        {/*
        <div className="mt-4">
          <TextField
            label="confirme sua senha *"
            name="confirmSenha"
            type="password"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.confirmSenha}
            error={formik.errors.confirmSenha ? true : false}
            helperText={formik.errors.confirmSenha ? formik.errors.confirmSenha : false}
          />
        </div> */}


        <Button variant="contained" size="medium" type="submit" color="primary" startIcon={loading && <CircularProgress size={24} />} disabled={loading} >
          {loading ? <>Enviando</> : <>{registerBtn}</>}
        </Button>

        <Link href="/login">
          <a>{registerLoginRegister}</a>
        </Link>
      </form>
      <AlertStatus alert={status} />
    </section>
  );
};


const registerBtn = 'Cadastrar';
const validade = 'confirme sua senha';
const registerTitle = 'Crie sua Conta';
const registerLoginRegister = 'Faça login em vez disso';

