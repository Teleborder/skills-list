var express = require('express');

function middleware(app) {
  app.use(express.static('public'));
}

module.exports = middleware;
