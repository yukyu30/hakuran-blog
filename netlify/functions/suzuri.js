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

  const response = await axios.post(apiUrl, parmas, config)
    .then((res) => {
      return {
        statusCode: res.status,
        body: res.data.prodoucts[0].sampleUrl
      }
    })
    .catch((e) => {
      return {
        statusCode: e.response.status,
        body: e.response
      }
    });
  console.log(response)

  return {
    statusCode: response.statusCode,
    body: response.body
  }
};