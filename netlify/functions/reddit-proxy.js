const axios = require('axios');

exports.handler = async (event) => {
  const { queryStringParameters } = event;
  
  try {
    const endpoint = queryStringParameters?.endpoint || '';
    const { endpoint: _, ...params } = queryStringParameters || {};
    
    console.log('Making request to Reddit:', `https://www.reddit.com/${endpoint}`);
    console.log('With params:', params);
    
    const response = await axios.get(`https://www.reddit.com/${endpoint}`, {
      params: params,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; reddit-app/1.0; +https://my-reddit-search-app.netlify.app) (by /u/ojmayo200)',
        'Accept': 'application/json'
      }
    });

    console.log('Success! Status:', response.status);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=60'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Reddit API Error:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Data:', error.response?.data);
    console.error('Headers:', error.response?.headers);
    
    return {
      statusCode: error.response?.status || 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        redditError: error.response?.data
      })
    };
  }
};

