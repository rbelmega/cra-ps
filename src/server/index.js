import express from 'express';
import 'isomorphic-fetch';
// we'll talk about this in a minute:
import serverRenderer from './middleware/renderer';
const StartKeepAlive = require('./heroku-alive');
const alive = new StartKeepAlive();

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;

const PORT = process.env.PORT || 3000;
const path = require('path');
// initialize the application and create the routes
const app = express();
const router = express.Router();
// root (/) should always serve our server rendered page
// other static resources should just be served as they are
router.use('/api', (req, res) => {
  res.sendFile(path.resolve(__dirname, `../data${req.url}`));
});

router.use('/api2/instagram', (req, res) => {
  fetch(
    'https://api.instagram.com/v1/users/321136775/media/recent?access_token=' +
      INSTAGRAM_TOKEN
  )
    .then(data => data.json())
    .then(data => {
      res.send(data);
    });
});

router.use('/', serverRenderer);
// router.use('^/$', serverRenderer);

router.use(
  express.static(path.resolve(__dirname, '../..', 'build/'), { maxAge: '30d' })
);

// tell the app to use the above rules
app.use(router);
//keep heroku running
alive.run();
// start the app
app.listen(PORT, error => {
  if (error) {
    return console.log('something bad happened', error);
  }

  console.log('listening on ' + PORT + '...');
});
