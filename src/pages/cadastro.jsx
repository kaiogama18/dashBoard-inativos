import Link from 'next/link';
export default () => {
  return (
    <>
      <div className="flex content-center flex-wrap justify-center h-screen bg-blue-500 overflow-hidden ">
        <form className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg bg-white card p-6">
          <p className=" text-2xl text-center ">Criar sua Conta</p>
          <div className="flex flex-col px-6 py-4">
            <lable className="ext-base my-2">Informe seu nome</lable>
            <input
              className="rounded inline-block  bg-gray-300 px-2 py-2"
              type="text"
            />
          </div>

          <div className="flex flex-col px-6 ">
            <lable className="ext-base my-2">Informe sua senha</lable>
            <div className="grid grid-cols-2 gap-4 ">
              <input
                className="rounded inline-block  bg-gray-300 px-2 py-2"
                type="password"
              />
              <input
                className="rounded inline-block  bg-gray-300 px-2 py-2"
                type="password"
                placeholder="confirmar"
              />
            </div>
            <p className="text-sm mt-1">Use oito ou mais caracteres</p>
          </div>
          <div class="flex flex-col px-6 py-4">
            <button
              className="bg-blue-600  text-white font-bold py-2 px-4 my-2 rounded hover:bg-blue-700"
              type="submit"
            >
              Cadastrar
            </button>

            <Link href="/login">
              <a className="text-blue-600 hover:text-blue-700 self-center my-2">
                Faça login em vez disso
              </a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
