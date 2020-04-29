import fetch from 'isomorphic-unfetch';
const url = 'https://inativos.appspot.com'

export default async (req, res) => {
  const { route, param } = await req.body;
  console.log("[API] => " + JSON.stringify(await req.body, null, 2))
  console.log("[API] route => " + JSON.stringify(await route, null, 2))
  console.log("[API] param => " + JSON.stringify(await param, null, 2))


  try {
    const response = await fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(param),
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


