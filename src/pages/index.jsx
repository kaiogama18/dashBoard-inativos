import { CropPicker, Navbar, ResultCrop, Plots, Layout } from '../components';
import React from 'react';
import nextCookie from "next-cookies";
import { withAuthSync } from "../utils/auth";
import { Router } from "next/router";

class Index extends React.Component {
  state = {
    crop: '',
  };

  handleCropChange = async (crop) => {
    this.setState({
      crop: crop,
    });
  };

  render() {
    const { crop } = this.state;
    return (
      <Layout>
        <div className="home">
          <Navbar />
          <div className="card-grid">
            <CropPicker handleCropChange={this.handleCropChange} />
            <ResultCrop crop={crop} />
            <Plots crop={crop} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default Index;
// Index.getInitialProps = async (ctx) => {
//   const { token } = nextCookie(ctx);
//   const apiUrl = getHost(ctx.req) + "api/profile";
//   const redirectError = () =>
//     typeof window !== "undefined"
//       ? Router.push("/login")
//       : ctx.res.writeHead(302, { Location: "/login" }).end();

//   try {
//     const response = await fetch(apiUrl, {
//       credentials: "include",
//       headers: {
//         Authorization: JSON.stringify({ token }),
//       },
//     });

//     if (response.ok) {
//       const js = await response.json();
//       console.log("[Leprs] -- js: ", js);
//       return js;
//     } else {
//       return await redirectError();
//     }
//   } catch (error) {
//     return redirectError();
//   }
// };
// export default withAuthSync(Index);

