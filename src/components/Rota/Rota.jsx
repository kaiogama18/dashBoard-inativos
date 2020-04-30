import { useState, useEffect } from 'react';

export default async (props) => {
  const url = 'api/inativo_api';

  alert("Route api + route: \n" + JSON.stringify(props.route, null, 2));


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props),
    });

    if (response.status === 200) {
      const { data, menssage, code } = await response.json();
      return JSON.stringify(code, menssage, data)
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    const { response } = error;
    alert("Error de Conexão");
  }










}
