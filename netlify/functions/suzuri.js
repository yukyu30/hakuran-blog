const axios = require('axios');

exports.handler = async (event, context) => {
  const apiUrl = "https://suzuri.jp/api/v1/materials/text";
  const config = {
    headers: {
      "Authorization": `Bearer ${process.env.SUZURI_API_KEY}`,
      "Content-Type": "application/json"
    },
  };

  const data = { text: "this is test" }

  const response = await axios.post(apiUrl, data, config)
    .then((res) => {
      const data = {
        status: res.status,
        data: res.data,
      };
      return {
        statusCode: res.status,
        body: JSON.stringify(data),
      };
    })
    .catch((e) => {
      const error = {
        status: e.response.status,
        data: e.response.data,
      };
      return {
        statusCode: e.response.status,
        body: JSON.stringify(error),
      };
    });
  console.log(response)

  return response;
};