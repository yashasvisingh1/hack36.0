const { Configuration, OpenAIApi } = require("openai");

console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = new OpenAIApi(configuration);