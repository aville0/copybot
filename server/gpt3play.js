require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const { v4: uuidv4 } = require("uuid");

// import the client input as prompt

async function main() {

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion("text-davinci-002", {
    id: uuidv4(),
    prompt: `\n\n${}\n\n`,
    temperature: 0.7,
    max_tokens: 5,
    top_p: 1.0,
    n: 3,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    

  });

  console.log(response.data.choices[0].text);
}

main();
