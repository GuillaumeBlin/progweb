import { createServer } from 'http';

const host = 'localhost';
const port = 8080;

const server = createServer();

server.on('request', function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Salut tout le monde !\n');
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
});
