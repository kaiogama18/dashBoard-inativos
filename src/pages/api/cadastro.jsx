import fetch from 'isomorphic-unfetch';
const url = 'https://inativos.appspot.com/login/usuario/cadastro'

export default async (req, res) => {
  const { data } = await req.body;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });


    if (response.ok) {
      // const json = await response.json();
      // console.log("[cadastro] ---> " + JSON.stringify(json, null, 2))
      // return res.status(200).json(json);

      const { menssage } = await response.json();
      return res.status(200).json({ token: menssage });











    } else {
      error.response = response;
      throw error;
    }
  } catch (error) {
    const { response } = error;

    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message });
  }
};
