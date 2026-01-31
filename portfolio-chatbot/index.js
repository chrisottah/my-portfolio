/**
 * Cloudflare Worker: AI Proxy for Portfolio Chatbot
 * Replaces Netlify function
 * Hides your Gemini/OpenAI API key
 */

export default {
  async fetch(request, env) {
    try {
      // Only accept POST requests
      if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
          status: 405,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { message } = await request.json();

      if (!message) {
        return new Response(JSON.stringify({ error: 'Missing message' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // === CALL GEMINI API ===
      // Replace GEMINI_API_KEY with your actual key in Workers environment variables
      const GEMINI_API_KEY = env.GEMINI_API_KEY;

      const apiResponse = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GEMINI_API_KEY}`
          },
          body: JSON.stringify({
            prompt: {
              text: message
            },
            temperature: 0.7,
            candidateCount: 1
          })
        }
      );

      const data = await apiResponse.json();

      // Ensure proper structure
      const responseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm having trouble generating a response. Please contact Christian directly:\n📧 themystictechie@gmail.com\n📱 WhatsApp: +234 803 495 4849";

      // Respond with same structure your frontend expects
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [{ text: responseText }]
              }
            }
          ]
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // GitHub Pages / any domain
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    } catch (err) {
      console.error('Worker Error:', err);
      return new Response(
        JSON.stringify({
          candidates: [
            {
              content: {
                parts: [
                  {
                    text:
                      "I'm currently unable to respond. Contact Christian directly:\n📧 themystictechie@gmail.com\n📱 WhatsApp: +234 803 495 4849"
                  }
                ]
              }
            }
          ]
        }),
        { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
      );
    }
  }
};
