import React from 'react';
import fetch from 'node-fetch';
import { Router } from 'next/router';
import nextCookie from 'next-cookies';
import Layout from '../components/Layout';
import { withAuthSync } from '../utils/auth';
import getHost from '../utils/get-host';

import { CropPicker, Navbar } from '../components/index';

class Index extends React.Component {
  state = {
    data: {},
    crop: 'base',
  };

  handleCropChange = async (crop) => {
    console.log('Index Crop --> ' + crop);
    // const fetcheddata = await fetchData(country);
    // this.setState({ data: fetcheddata, country: country })
  };

  render() {
    const { data, crop } = this.state;

    return (
      <Layout>
        <div className="home">
          <Navbar />
          <div className="card-grid">
            <CropPicker handleCropChange={this.handleCropChange} />
            {/* <SelectCrop /> */}
          </div>
        </div>
      </Layout>
    );
  }
}

// Index.getInitialProps = async (ctx) => {
//   const { token } = nextCookie(ctx);
//   const apiUrl = `${getHost(ctx.req)}api/profile`;

//   const redirectError = () =>
//     typeof window !== 'undefined'
//       ? Router.push('/login')
//       : ctx.res.writeHead(302, { Location: '/login' }).end();

//   try {
//     const response = await fetch(apiUrl, {
//       credentials: 'include',
//       headers: {
//         Authorization: JSON.stringify({ token }),
//       },
//     });

//     if (response.ok) {
//       const js = await response.json();
//       return js;
//     }
//     return await redirectError();
//   } catch (error) {
//     return redirectError();
//   }
// };
// export default withAuthSync(Index);

export default Index;
