// raw server.js (no NPM needed)
const http = require('http');

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
