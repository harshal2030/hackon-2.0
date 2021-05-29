import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { buildSchema } from 'type-graphql';
import { __prod__ } from './constants';
import { UserResolver } from './resolvers/user';
import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';
import { ScoreResolver } from './resolvers/score';

const main = async () => {
  const orm = await MikroORM.init(config);
  await orm.getMigrator().up();
  const app = express();

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ScoreResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, em: orm.em })
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  app.listen(4000, () => {
    console.log('Server listening on 4000');
  });
}

main();
