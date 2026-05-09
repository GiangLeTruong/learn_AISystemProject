'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7101;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//Customers routes:
app.use('/', require('./routes/authenticationRoute'));

app.listen(port, () => {
  console.log(`Ctrl + click to open User Service: http://localhost:${port}/`);
});

module.exports = app;
