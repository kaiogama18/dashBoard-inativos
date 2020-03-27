import Layout from "../components/Layout";
import Link from 'next/link'
const Index = () => (
  <Layout>
    <div class="panel">
      <img src="https://buritech.com.br/site/logo.png"></img>
      <div class="formset">
        <div class="form-group">
          <lable class="form-label">Informe seu nome ou e-mail:</lable>
          <input type="text" class="form-control" />
        </div>
        <div class="form-group">
          <lable class="form-label">Informe sua senha:</lable>
          <input type="password" class="form-control" />
        </div>
        <p id="plogintoregister">Esqueci minha senha</p>
        <Link href="/home">

        <button class="btn">Conectar</button>
        </Link>

        <p class="at" id="textchange" onclick="register()">
            
        {" "}
        Fazer o cadastro agora
      </p>
      </div>
    </div>
  </Layout>
);
export default Index;
