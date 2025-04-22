const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const DISCORD_WEBHOOK_URL = process.env.WEBHOOK_URL;
const PROXY_TARGET = process.env.PROXY_URL;

app.use(express.json());

// === Discord Webhook POST Receiver ===
app.post('/', async (req, res) => {
  if (DISCORD_WEBHOOK_URL) {
    try {
      await axios.post(DISCORD_WEBHOOK_URL, req.body);
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send to Discord' });
    }
  } else {
    res.status(400).json({ error: 'No webhook URL configured' });
  }
});

// === Reverse Proxy for everything else ===
app.use('/', createProxyMiddleware({
  target: PROXY_TARGET,
  changeOrigin: true,
  ws: true,
  pathRewrite: (path, req) => path, // optionally adjust paths
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
