import React, { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import Rota from '../Routes/Rota';
import { login } from '../utils/auth';
import { TextField, Button, CircularProgress, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import * as Yup from "yup";
import Alert from '../components/Alert/Alert';


export default () => {
  const route = '/login/usuario';
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState([]);
  const [openStatus, seOpenStatus] = useState(false);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('email invalido')
      .required('Obrigatório'),
    senha: Yup.string()
      .required('Obrigatório'),
  });

  const handleSubmit = async (param) => {
    setLoading(true)
    try {
      const { code, menssage, data } = await Rota({ route, param });
      if (code === 200) {
        await login({ token: data[0].cpf });
      } else {
        setStatus({ code: code, menssage: menssage })
        seOpenStatus(true)
        setLoading(false)
      }
    } catch (error) {
      setStatus({ code: code, menssage: "Sem Coneção" })
      seOpenStatus(true)
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


  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    seOpenStatus(false)
  };

  const Feedback = (
    status.code == 203 ?
      <Dialog open={openStatus} onClose={handleClose} >
        <DialogTitle>Oops, usuário inativo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {status.menssage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
        </Button>
        </DialogActions>
      </Dialog>
      : <Snackbar open={openStatus} autoHideDuration={2500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status.code == 400 ? "error" : "success"}>
          {status.menssage}
        </Alert>
      </Snackbar>
  )

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
          variant="filled"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email ? true : false}
          helperText={formik.errors.email ? formik.errors.email : false}
        />
        <div className="mt-5">
          <TextField
            label="Senha *"
            name="senha"
            type="password"
            variant="filled"
            onChange={formik.handleChange}
            value={formik.values.senha}
            error={formik.errors.senha ? true : false}
            helperText={formik.errors.senha ? formik.errors.senha : false}
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
      {Feedback}
    </section>
  );
};
const loginBtn = 'Entrar';
const loginRegister = 'Fazer o cadastro agora';
