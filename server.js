const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('public'));

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  setInterval(() => {
    const data = { message: 'Hello from server!', timestamp: new Date() };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    console.log("Entry added")
  }, 3000);

  req.on('close', () => {
    console.log('Connection closed');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
