const http = require('http');
const url = require('url');


const server = http.createServer(async (req, res) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  console.log(`Parsed Path: ${path}`);
  console.log(`Query Parameters:`, query);

  if (path === '/weather') {
    const cityName = query.city;
    console.log(`City Requested: ${cityName}`);

    if (!cityName) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end(' City not provided. Use /weather?city=CityName');
      return;
    }

    try {
      console.log(`Fetching weather for ${cityName}...`);

      const response = await fetch(`https://wttr.in/${cityName}?format=%t`);
      console.log(`API Response Status: ${response.status}`);

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const temperature = await response.text();
      console.log(`Temperature received: ${temperature}`);

      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(` Weather in ${cityName}: ${temperature}`);
    } catch (err) {
      console.error(`Error fetching weather: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(` Failed to fetch weather: ${err.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(' Route not found');
  }
});

server.listen(3000, () => {
  console.log(' Server is listening at: http://localhost:3000');
});




//access the server from another device on the same network using my local network IP

/*
const os = require('os');
const networkInterfaces = os.networkInterfaces();

// Get your local IP address
const localIP = Object.values(networkInterfaces)
  .flat()
  .find((iface) => iface.family === 'IPv4' && !iface.internal)?.address;

server.listen(3000, () => {
  console.log(' Server is listening at:');
  console.log(' Local:   http://localhost:3000');
  if (localIP) {
    console.log(` Network: http://${localIP}:3000`);
  }
});
*/




