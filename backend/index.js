const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  })
);
