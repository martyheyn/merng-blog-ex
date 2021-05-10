const { gql } = require('apollo-server');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    group: String!
    tags: [String]
  }
  type Comment {
    id: ID!
    username: String!
    body: String!
    likes: [Like]!
    createdAt: String!
    replys: [Reply]!
  }
  type Reply {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    bio: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUser(username: String!): User
    getGroupPosts(groupName: String!): [Post]
    getTagPosts(tagName: String!): [Post]
  }
  type Mutation {
    # user mutations
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    editUser(userId: ID!, email: String!, bio: String): User!
    deleteUser(userId: ID!): String!
    # post mutations
    createPost(body: String!, title: String!, group: String): Post!
    deletePost(postId: ID!): String!
    editPost(postId: ID!, body: String!): Post!
    # comment mutations
    createComment(postId: ID!, body: String!): Post!
    createReply(postId: ID!, commentId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    deleteReply(postId: ID!, commentId: ID!, replyId: ID!): Post!
    likePost(postId: ID!): Post!
    # Group
    addTag(postId: ID!, tag: String!): Post!
  }
`;

module.exports = typeDefs;
