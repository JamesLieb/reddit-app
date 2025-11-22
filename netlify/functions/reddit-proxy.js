const axios = require('axios');

exports.handler = async (event) => {
  const { queryStringParameters } = event;
  
  try {
    const endpoint = queryStringParameters.endpoint || '';
    const { endpoint: _, ...params } = queryStringParameters || {};
    
    console.log('Requesting:', `https://www.reddit.com/${endpoint}`, 'with params:', params);
    
    const response = await axios.get(`https://www.reddit.com/${endpoint}`, {
      params: params,
      headers: {
        'User-Agent': 'web:my-reddit-search-app.netlify.app:v1.0.0 (by /u/your_reddit_username)'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response data structure:', Object.keys(response.data));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Full error:', error.response?.status, error.response?.data);
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data
      })
    };
  }
};