import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import Router from 'next/router';
import Rota from '../Routes/Rota';
import { TextField, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar } from '@material-ui/core';
import * as Yup from "yup";
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { Alert } from '../components';




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
  const [openStatus, seOpenStatus] = useState(false);

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
    confirmSenha: Yup.string()
      .oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais')
  });

  const handleSubmit = async (param) => {
    setLoading(true)
    try {
      const { code, menssage } = await Rota({ route, param });
      if (code === 200) {
        setStatus({ code: code, menssage: menssage })
        seOpenStatus(true)
        setLoading(false)
      } else {
        setStatus({ code: code, menssage: menssage })
        seOpenStatus(true)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      setStatus({ code: code, menssage: menssage })
      seOpenStatus(true)
    }
  }

  const formik = useFormik({
    initialValues: {
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      confirmSenha: '',
    },
    validationSchema: SignupSchema,
    onSubmit: data => {
      const { nome, cpf, email, senha } = data
      const param = { nome, cpf, email, senha }
      handleSubmit(param)
    },
  });

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    seOpenStatus(false)
  };

  const Feedback = (
    status.code == 200 ?
      <Dialog open={openStatus} onClose={handleClose} >
        <DialogTitle>Sucesso</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {status.menssage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => Router.push('/login')} color="primary">
            Fazer Login
        </Button>
        </DialogActions>
      </Dialog>
      : <Snackbar open={openStatus} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {status.menssage}
        </Alert>
      </Snackbar>
  )

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


        <div className="mt-5">
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
        </div>


        <Button variant="contained" size="medium" type="submit" color="primary" startIcon={loading && <CircularProgress size={24} />} disabled={loading} >
          {loading ? <>Enviando</> : <>{registerBtn}</>}
        </Button>

        <Link href="/login">
          <a>{registerLoginRegister}</a>
        </Link>
      </form>
      {Feedback}
    </section>
  );
};


const registerBtn = 'Cadastrar';
const validade = 'confirme sua senha';
const registerTitle = 'Crie sua Conta';
const registerLoginRegister = 'Faça login em vez disso';

