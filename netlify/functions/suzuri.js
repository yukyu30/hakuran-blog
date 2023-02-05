const axios = require('axios');

exports.handler = async (event, context) => {
  const apiUrl = "https://suzuri.jp/api/v1/materials/text";
  const config = {
    headers: {
      "Authorization": `Bearer ${process.env.SUZURI_API_KEY}`,
      "Content-Type": "application/json"
    },
  };
  const parmas = new URLSearchParams;
  parmas.append("text", "this is test");

  try {
    const response = await axios.post(apiUrl, parmas, config);

    if (response.status >= 200 && response.status < 300) {
      return {
        statusCode: response.status,
        body: JSON.stringify(response.data)
      };
    } else {
      throw new Error(`Invalid status code: ${response.status}`);
    }
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};