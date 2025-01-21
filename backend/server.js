import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { resolvers } from './graphql/resolvers.js';
import { typeDefs } from './graphql/typeDefs.js';
import { User } from './models/User.js';
import { Post } from './models/Post.js';
import connection  from './config/connection.js';
const app = express();

app.use(cors(), bodyParser.json());


// Connect to MongoDB
mongoose.connect(connection.dbConnectionString);

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});

// Define Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.authorization,
      models: {
        User,
        Post,
      },
    }),
  })
);

// Start Express server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
});
