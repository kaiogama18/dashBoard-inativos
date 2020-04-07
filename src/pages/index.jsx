import fetch from "node-fetch";
import Layout from "../components/Layout";
import { Router } from "next/router";
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import getHost from "../utils/get-host";
import SelectCrop from "../components/selectCrop";

function Index({ props }) {
  // console.log("[LEPRS] ---> avatarUrl: ", props);
  return (
    <Layout>
      <SelectCrop />
    </Layout>
  );
}

Index.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  const apiUrl = getHost(ctx.req) + "api/profile";
  const redirectError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await fetch(apiUrl, {
      credentials: "include",
      headers: {
        Authorization: JSON.stringify({ token }),
      },
    });

    if (response.ok) {
      const js = await response.json();
      return js;
    } else {
      return await redirectError();
    }
  } catch (error) {
    return redirectError();
  }
};
export default withAuthSync(Index);
// export default Index;
