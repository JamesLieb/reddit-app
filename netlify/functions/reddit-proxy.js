const axios = require('axios');

exports.handler = async (event) => {
  const { path, queryStringParameters } = event;
  
  try {
    // Extract the Reddit endpoint from the path
    // e.g., /.netlify/functions/reddit-proxy?endpoint=search.json&q=cats&limit=25
    const endpoint = queryStringParameters.endpoint || '';
    
    // Remove endpoint from params before forwarding
    const { endpoint: _, ...params } = queryStringParameters || {};
    
    const response = await axios.get(`https://www.reddit.com/${endpoint}`, {
      params: params,
      headers: {
        'User-Agent': 'https://my-reddit-search-app.netlify.app/u/Ojmayo200'
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: error.response?.data?.message || error.message
      })
    };
  }
};