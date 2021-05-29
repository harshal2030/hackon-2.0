import { __prod__ } from './constants';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { User } from './entities/User';
import { Score } from './entities/Score';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: process.env.db!,
  user: process.env.user!,
  password: process.env.password!,
  debug: !__prod__,
  type: 'postgresql',
  entities: [User, Score],
} as Parameters<typeof MikroORM.init>[0];
