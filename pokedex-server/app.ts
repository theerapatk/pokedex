import compression = require('compression');
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as path from 'path';
import setMongo from './mongo';
import setRoutes from './routes';

const app = express();
dotenv.config();
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const main = async () => {
  try {
    await setMongo();
    setRoutes(app);

    app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

    app.use((err: any, req: any, res: any, next: any) => {
      res.status(err.status || 500);
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });

    if (require.main === module) {
      const port = app.get('port');
      app.listen(port, () => console.log(`** Pokedex server is listening on port ${port}, (http://localhost:${port}/) **`));
    }
  } catch (err) {
    console.error(err);
  }
};

main();

export { app };

