require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

async function fetchGPT3({ prompt, model = "text-davinci-002" }) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion(model, {
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  return response.data.choices[0].text;
}

module.exports = fetchGPT3;
