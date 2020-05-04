
export default async (props) => {
  const url = 'api/inativo_api';


  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props),
    });
    if (response.status === 200) {
      const { data, menssage, code } = await response.json();
      // alert(menssage)
      return { code, menssage, data }
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  } catch (error) {
    const { response } = error;
    // alert("Error de Conexão");
  }

}
