import fetch from 'isomorphic-unfetch';

export default (req, res) => {
  const token = req.query;
  const url = `https://inativos.appspot.com/home/safras/${token.route}`;
  const request = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ safra: token.key }),
      });
      if (response.ok) {
        const json = await response.json();
        return res.status(200).json(json);
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
  request();
};
