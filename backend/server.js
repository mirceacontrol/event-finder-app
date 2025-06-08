require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/search-events', async (req, res) => {
  const { keyword = '', city = '', date = '' } = req.query;
  const apiKey = process.env.TICKETMASTER_API_KEY;

  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=10`;
  if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
  if (city) url += `&city=${encodeURIComponent(city)}`;
  if (date) url += `&startDateTime=${date}T00:00:00Z&endDateTime=${date}T23:59:59Z`;

  try {
    const tmRes = await fetch(url);
    const data = await tmRes.json();

    if (!tmRes.ok) {
      console.error("Ticketmaster API error:", data);
      return res.status(500).json({ error: "Ticketmaster API error", detail: data });
    }

    if (!data._embedded || !Array.isArray(data._embedded.events)) {
      console.error("Ticketmaster response (no events):", data);
      return res.json([]);
    }

    res.json(
      data._embedded.events.map(ev => ({
        name: ev.name,
        date: ev.dates.start.localDate,
        venue: ev._embedded.venues[0].name,
        city: ev._embedded.venues[0].city.name,
        url: ev.url
      }))
    );
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: 'Failed to fetch from Ticketmaster', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
