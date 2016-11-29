import * as express from 'express';

const apiRouter = express.Router();

// apiRouter.get('/test', handlers.users.list);

export default function (app) {
  app.get('test', (req, res) => {
    res.send('test');
  });

  // only auth user has access to api
  // TODO: implement security
  app.use('/api', apiRouter);
}
