'use strict';
app.use(express.static(‘public’))
const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
