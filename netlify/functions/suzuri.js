const axios = require('axios');

exports.handler = async function (event, context) {
  const apiUrl = `https://suzuri.jp/api/v1/materials/text`;
  const config = {
    headers: {
      "Authorization": `Bearer ${process.env.SUZURI_API_KEY}`,
      "Content-Type": "application/ json"
    },
  };
  const parmas = new URLSearchParams
  parmas.append("text", "this is test")

  const response = axios.post(apiUrl, parmas, config)
    .then(({ data: data }) => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(e => ({
      statusCode: 400,
      body: e
    }));
  return {
    statusCode: response.statusCode,
    body: response.body
  }
};