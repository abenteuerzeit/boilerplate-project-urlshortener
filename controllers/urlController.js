const express = require('express');
const URLModel = require('../models/urlModel');
const URLValidator = require('../utils/urlValidator');

const router = express.Router();

router.get('/', (req, res) => res.sendFile(`${process.cwd()}/views/index.html`));

router.post('/api/shorturl', async (req, res) => {
  try {
    const originalURL = req.body.url;
    await new URLValidator(originalURL).validate();
    const shortURL = Math.floor(Math.random() * 10000).toString();
    await URLModel.insert(originalURL, shortURL);
    res.json({ original_url: originalURL, short_url: shortURL });
  } catch (error) {
    if (error.message === 'Invalid URL Format') res.json({ error: 'invalid url' });
    else res.status(500).json({ error: error.message });
  }
});

router.get('/api/shorturl/:short_url', async (req, res) => {
  try {
    const data = await URLModel.get(req.params.short_url);
    if (data && data.original_url) res.redirect(data.original_url);
    else res.status(404).send('URL not found');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
