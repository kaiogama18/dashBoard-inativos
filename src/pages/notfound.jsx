import React, { useState } from 'react';
import { Sidebar, Navbar } from '../components';
import { Button } from '@material-ui/core';
import Router from 'next/router';


export default () => {
  return (
    <>
      <main  >
        <Sidebar />
        <div className="h-screen w-full p-5 relative">
          <Navbar />

          <div className="flex flex-col w-full items-center justify-center mt-64">
            <p className="title">
              Estamos com problema de coneção
          </p>
            <div className="mt-5">
              <Button variant="contained" color="primary" onClick={() => Router.push('/login')}>
                <p className="subtitle" >Voltar par Login</p>
              </Button>
            </div>
          </div>

        </div>

      </main>
    </>

  );
};
