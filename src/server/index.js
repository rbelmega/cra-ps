import express from 'express';
// we'll talk about this in a minute:
import serverRenderer from './middleware/renderer';
const StartKeepAlive = require('./heroku-alive');
const alive = new StartKeepAlive();

const PORT = process.env.PORT || 3000;
const path = require('path');
// initialize the application and create the routes
const app = express();
const router = express.Router();
// root (/) should always serve our server rendered page
// other static resources should just be served as they are
router.use('*.*',
  express.static(path.resolve(__dirname, '../..', 'build/'), { maxAge: '30d' })
);
router.use('*', serverRenderer);

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
