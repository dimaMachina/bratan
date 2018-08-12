import express from 'express';
import bodyParser from 'body-parser';
import qs from 'querystring';
import axios from 'axios';
import moment from 'moment';
import { PORT } from './config';
import util from 'util';
import { join } from 'path';
import cors from 'cors';
import { hidereferrer } from './helpers/hidereferrer';

// create application/json parser
const jsonParser = bodyParser.json();

const publicPath = join(__dirname, '..','..','dashboard', 'build');

moment.locale('ru');
console.log = (...args) => {
  const consoleTime = `\x1b[34m[ ${moment().format('ddd, D MMMM YYYY, HH:mm:ss')} ]\x1b[0m`;
  process.stdout.write(util.format(consoleTime, ...args) + '\n');
};

const app = express();
app.use(express.static(publicPath));
app.use(cors());

app.get('/',(req,res) => {
  res.sendFile(join(publicPath, 'index.html'));
});

app.post('/hide', jsonParser, async (req, res) => {
  const { reftype, keywords } = req.body;
  try {
    const { url, error } = await hidereferrer({ url: req.body.url, reftype, keywords });
    res.json({ url, error });
  } catch (e) {
    res.json({ url: null, error: e.message });
  }
});

app.get('/go', (req, res) => {
  res.send('You in /go');
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
});

app.get('*', (req, res) => {
  res.send('Go to /go');
});

app.listen(PORT, function() {
  const { port } = this.address();
  console.log(`Server launched on port ${port}!`);
});
