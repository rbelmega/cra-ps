// import qs from 'qs' // Add this at the top of the file
require('newrelic');
const path = require('path');
const  Express = require('express');
const StartKeepAlive = require("./heroku-alive");
const app = Express();
const port = 3000;

const alive = new StartKeepAlive();
alive.run();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(Express.static(path.join(__dirname, './build')));

app.listen(process.env.PORT || port);