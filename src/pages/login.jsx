import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../components';
import { useFormik } from 'formik';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

export default () => {

  const handleSubmit = async (data) => {
    const url = 'api/entrar';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (response.status === 200) {
        const { token, code } = await response.json();
        if (code === 200) {
          Router.push('/');
        } else {
          alert(token);
        }
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      const { response } = error;
    }
  };


  const loginUser = 'Informe seu e-mail:';
  const loginPassword = 'Informe sua senha:';
  const loginBtn = 'Entrar';
  const loginRegister = 'Fazer o cadastro agora';
  const registerTitle = 'Faça login na sua conta';

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: ''
    },
    onSubmit: data => {
      handleSubmit(data)
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





// import React, { useState } from 'react';
// import fetch from 'isomorphic-unfetch';
// import { login } from '../utils/auth';
// import Link from 'next/link';
// import { Button } from '../components';

// const Login = () => {
//   const [userData, setUserData] = useState({ username: '', error: '' });
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setUserData(Object.assign({}, userData, { error: '' }));

//     const username = userData.username;
//     const url = 'api/login';

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username }),
//       });
//       if (response.status === 200) {
//         const { token } = await response.json();
//         await login({ token });
//       } else {
//         let error = new Error(response.statusText);
//         error.response = response;
//         throw error;
//       }
//     } catch (error) {
//       console.error('[Leprs] -- Error :( --> ', error);

//       const { response } = error;
//       setUserData(
//         Object.assign({}, userData, {
//           error: response ? response.statusText : error.message,
//         }),
//       );
//     }
//   };

  // const loginUser = 'Informe seu usuário do github:';
  // const loginPassword = 'Informe sua senha:';
  // const loginBtn = 'Entrar';
  // const loginRegister = 'Fazer o cadastro agora';
  // const registerTitle = 'Faça login na sua conta';

//   return (
//     <>
//       <section className="login-register">
//         {/* <img src="/logo.png" /> */}

        // <form onSubmit={handleSubmit}>
        //   <p className="login-register-title">{registerTitle}</p>
        //   <label>{loginUser}</label>
        //   <input
        //     type="text"
        //     id="username"
        //     name="username"
        //     value={userData.username}
        //     onChange={(event) =>
        //       setUserData(
        //         Object.assign({}, userData, { username: event.target.value }),
        //       )
        //     }
        //   />

        //   <label>{loginPassword}</label>
        //   <div className="relative bg-gray-300 rounded">
        //     <input type="password" />
        //     <div className="login-password">
        //       <a className="text-gray-900 underline">Esqueceu a senha?</a>
        //     </div>
        //   </div>

        //   <Button type="submit">{loginBtn}</Button>
        //   <Link href="/cadastro">
        //     <a>{loginRegister}</a>
        //   </Link>
        //   {userData.error && <p className="alert">Error: {userData.error} </p>}
        // </form>
//       </section>
//     </>
//   );
// };

// export default Login;
