import fetch from 'isomorphic-unfetch';
const url = 'https://inativos.appspot.com/adm_usuario/'

export default async (req, res) => {
  const { route } = await req.body;
  try {
    const response = await fetch(url + route, {
      method: 'POST',
    });

    if (response.ok) {
      const { data, menssage, code } = await response.json();
      return res.status(200).json({ data: data, menssage: menssage, code: code });

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


