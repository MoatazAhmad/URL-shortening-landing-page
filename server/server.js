// server.js
import express from 'express';
import fetch from 'node-fetch';  // or native fetch in Node 18+
import cors from 'cors';

const app = express();
app.use(cors());               // <-- sends Access-Control-Allow-Origin: * :contentReference[oaicite:6]{index=6}
app.use(express.urlencoded({ extended: true })); 

app.post('/shorten', async (req, res) => {
  const { url } = req.body;
  try {
    const apiRes = await fetch('https://cleanuri.com/api/v1/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ url })
    });
    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Proxy server running on http://localhost:3000'));
