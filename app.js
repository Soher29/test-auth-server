const http = require('http');
const express = require ('express');
const logger = require ('morgan');
const bodyParser = require ('body-parser');
const routes = require ('./routes/index.js');
const router = express.Router();
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
const server = http.createServer(app);
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
  extended: false
 })
);

app.use('/api', routes(router));

server.listen(port, hostname, () => {
  console.log(`Server running at http://127.0.0.1:3000/`);
  });
