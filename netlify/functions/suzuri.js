const axios = require('axios');

exports.handler = async (event, context) => {
  const apiUrl = "https://suzuri.jp/api/v1/materials/text"
  const config = {
    headers: {
      "Authorization": `Bearer ${process.env.SUZURI_API_KEY}`,
      "Content-Type": "application/json"
    },
  }

  const data = { "text": JSON.parse(event.body).text }

  const response = await axios.post(apiUrl, data, config)
    .then((res) => {
      return {
        statusCode: res.status,
        body: JSON.stringify(res.data),
      }
    })
    .catch((e) => {
      return {
        statusCode: e.response.status,
        body: JSON.stringify(e.response.data),
      }
    })
  console.log(response)

  return response;
};