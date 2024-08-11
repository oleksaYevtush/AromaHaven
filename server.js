const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://aroma-haven.vercel.app');

  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.options('/chat', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://aroma-haven.vercel.app');

  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization');
  res.sendStatus(200);
});

const responses = {
  1: "Aromatherapy is a holistic healing treatment using natural plant extracts, like essential oils, to promote physical and emotional well-being",
  2: "👐To choose your favorite flavor, start by considering your taste preferences. Try sampling various options, paying attention to the ingredients and flavor profiles. Enjoy the process of discovery and trust your instincts))",
  3: "🕯️We offer a wide range of aromatherapy products, including essential oils, diffusers, candles, and therapeutic blends. Explore our selection to find the perfect items for your wellness needs"
};

app.post('/chat', (req, res) => {
  console.log('Received message:', req.body);
  const { message } = req.body;
  const messageNumber = parseInt(message.trim());
  const responseMessage = responses[messageNumber] || "Error";
  res.json({ content: responseMessage });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});
