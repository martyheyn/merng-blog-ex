const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

// Initialize express
const app = express();

const { MONGODB } = require('./config.js');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  introspection: true,
  playground: true,
});

app.use(express.static('public'));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
);

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Graphql server running at ${res.url}`);
  });
