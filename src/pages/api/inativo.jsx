import fetch from "isomorphic-unfetch";

export default (req, res) => {
  const url = "https://inativos.appspot.com/home/safras";
  const request = async () => {
    try {
      const response = await fetch(url);
      if(response.ok) {
      const json = await response.json();
      console.log("[Leprs] -- Api Safra" , json);
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
