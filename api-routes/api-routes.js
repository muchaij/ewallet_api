var express = require('express');
var apiRoutes = express();
var requireAuthentication = require('../auth/apiKey-Auth');

apiRoutes.all('*', requireAuthentication);

apiRoutes.get('/login', (req, res, next)=>{
    res.send('Welcome to API.');
});

module.exports = apiRoutes;