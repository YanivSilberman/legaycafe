require('dotenv').config();

import path from 'path';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import schema from './schema/schema';

const app = express();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: async ({ req }) => {
    let authToken = null, currentUser = null;

    try {
      authToken = req.headers.authorization;

      if (authToken) {
        currentUser = await jwt.verify(authToken, process.env.JWT_SECRET);
      }
    } catch (e) {
      // console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return { authToken, currentUser };
  }
});


const corsOptions = {
  origin: process.env.FULL_URL,
  credentials: true,
};

app.use('*', cors(corsOptions));
app.use(compression());

// route react app
app.use(express.static(path.join(__dirname, '../', '../', 'dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../', '../', 'dist', 'index.html'));
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen(
  { port: process.env.PORT || 3000 },
  (): void => console.log(`\n🚀      Legay.cafe is now running on ${process.env.FULL_URL}`));
