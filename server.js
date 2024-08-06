const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://aroma-haven.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/chat', (req, res) => {
  res.json({ message: 'It works!' });
});

const responses = {
  1: "Aromatherapy is a holistic healing treatment using natural plant extracts, like essential oils, to promote physical and emotional well-being",
  2: "👐To choose your favorite flavor, start by considering your taste preferences. Try sampling various options, paying attention to the ingredients and flavor profiles. Enjoy the process of discovery and trust your instincts))",
  3: "🕯️We offer a wide range of aromatherapy products, including essential oils, diffusers, candles, and therapeutic blends. Explore our selection to find the perfect items for your wellness needs"
};

app.post('/chat', (req, res) => {
  const { message } = req.body;
  const messageNumber = parseInt(message.trim());
  const responseMessage = responses[messageNumber] || "Error";

  res.json({ content: responseMessage });
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
