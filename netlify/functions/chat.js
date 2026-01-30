exports.handler = async (event, context) => {
  // 1. Only allow POST requests from your frontend
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  // 2. Access the API Key you set in the Netlify Dashboard
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key is missing in Netlify environment variables.' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    // 3. Use global fetch (Native in Node 18+)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: message }]
          }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*' 
        },
        body: JSON.stringify({ error: 'Gemini API rejected the request', details: data })
      };
    }

    // 4. Return the AI response to your script.js
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};