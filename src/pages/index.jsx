import React from 'react';
import fetch from 'node-fetch';
import { Router } from 'next/router';
import nextCookie from 'next-cookies';
import Layout from '../components/Layout';
import { withAuthSync } from '../utils/auth';
import getHost from '../utils/get-host';
import SelectCrop from '../components/selectCrop';
import Navbar from '../components/Navbar';

function Index() {
  return (
    <Layout>
      <div className="w-full p-5">
        <Navbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-4">
          <SelectCrop />
        </div>
      </div>
    </Layout>
  );
}

Index.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  const apiUrl = `${getHost(ctx.req)}api/profile`;
  const redirectError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end();

  try {
    const response = await fetch(apiUrl, {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token }),
      },
    });

    if (response.ok) {
      const js = await response.json();
      return js;
    }
    return await redirectError();
  } catch (error) {
    return redirectError();
  }
};
export default withAuthSync(Index);
