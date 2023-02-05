const axios = require('axios');

exports.handler = async (event, context) => {
  const apiUrl = "https://suzuri.jp/api/v1/materials/text";
  const config = {
    headers: {
      "Authorization": `Bearer ${process.env.SUZURI_API_KEY}`,
      "Content-Type": "application/json"
    },
  };
  const parmas = new URLSearchParams
  parmas.append("text", "this is test")

  const response = axios.post(apiUrl, parmas, config)
    .then((res) => ({
      statusCode: res.status,
      body: JSON.stringify(res.data)
    }))
    .catch((e) => ({
      statusCode: e.response.status,
      body: JSON.stringify(e.response)
    }));
  console.log(response)

  return {
    statusCode: response.statusCode,
    body: response.body
  }
};