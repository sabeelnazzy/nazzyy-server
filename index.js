const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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',

});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating response');
  }
});

app.get('/', (req, res) => {
  res.send('Nazzyy server is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
