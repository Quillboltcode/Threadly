import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';
import connection from './config/connection.js';
import userRoutes from './routes/UserRoutes.js';
import User from './models/User.js';
import { Post } from './models/Post.js';

dotenv.config();

const app = express();

// Middleware for handling CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// User Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB with better error handling
mongoose
  .connect(connection.dbConnectionString)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || '';
      return {
        token,
        models: { User, Post },
      };
    },
  })
);

// Start Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
});
