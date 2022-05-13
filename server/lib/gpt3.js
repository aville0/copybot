require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

async function fetchGPT3({ prompt, model = "text-davinci-002" }) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion(model, {
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 100,
    top_p: 1.0,
    n: 6,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.data;  
}

module.exports = fetchGPT3;
