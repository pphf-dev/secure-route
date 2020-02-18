const express = require('express');

const secretsRouter = express.Router();

secretsRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('Secret Message: The eagle has landed.');
});

module.exports = secretsRouter;