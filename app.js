const http = require('http');
const express = require('express');
const index = require('./index.js');
const host = 'localhost';
const port = 3000;

const app = express();

app.use((req, res) => {
    index(req, res);
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({mensagem:'Olhe o terminal do código....'}));
});

app.listen(port, host);