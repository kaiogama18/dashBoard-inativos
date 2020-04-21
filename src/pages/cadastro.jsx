import Link from 'next/link';
import Button from '../components/Button';

export default () => {
  const registerBtn = 'Cadastrar';
  const validade = 'confirme sua senha';
  const registerTitle = 'Crie sua Conta';
  const registerUser = 'Informe seu usuário:';
  const registerPassword = 'Informe sua senha:';
  const caracteres = 'Use oito ou mais caracteres';
  const registerLoginRegister = 'Faça login em vez disso';

  return (
    <>
      <section className="login-register">
        <form>
          <p className="text-2xl border-b-4 border-gray-300 uppercase">
            {registerTitle}
          </p>
          <label>{registerUser}</label>
          <input type="text" />
          <label>{registerPassword}</label>
          <div className="grid grid-cols-2 gap-4">
            <input type="password" />
            <input type="password" placeholder={validade} />
          </div>
          <p className="text-sm mt-1">{caracteres}</p>
          <Button type="submit">{registerBtn}</Button>
          <Link href="/login">
            <a>{registerLoginRegister}</a>
          </Link>
        </form>
      </section>
    </>
  );
};
