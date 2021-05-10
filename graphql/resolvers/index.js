const postsResolvers = require('./posts.js');
const usersResolvers = require('./users.js');
const commentsResolver = require('./comments.js');

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...usersResolvers.Query,
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolver.Mutation,
  },
};

module.exports = resolvers;
