import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import schema from './schema/schema';
import { secret } from './resolvers';

const app = express();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: async ({ req }) => {
    let authToken = null, currentUser = null;

    try {
      authToken = req.headers.authorization;

      if (authToken) {
        currentUser = await jwt.verify(authToken, secret);
      }
    } catch (e) {
      // console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return { authToken, currentUser };
  }
});


const corsOptions = {
  origin: 'http://localhost:1234',
  credentials: true,
};

app.use('*', cors(corsOptions));
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);

server.installSubscriptionHandlers(httpServer);

httpServer.listen(
  { port: 3000 },
  (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
