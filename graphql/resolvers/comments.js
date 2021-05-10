const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');
const { AuthenticationError, UserInputError } = require('apollo-server');

const commentsResolver = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment cannot be empty',
          },
        });
      }

      const post = await Post.findById(postId);
      console.log(post);

      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
    async createReply(_, { postId, commentId, body }, context) {
      const user = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment cannot be empty',
          },
        });
      }

      const post = await Post.findById(postId);
      let comment;

      post.comments.map((c) => {
        if (c.id === commentId) {
          comment = c;
        }
      });

      if (comment) {
        comment.replys.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const user = checkAuth(context);
      console.log('In Delete Comment');

      const post = await Post.findById(postId);
      if (post) {
        // find index of comment in the array of comments
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === user.username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else throw new UserInputError('Post not found');
    },
    async deleteReply(_, { postId, commentId, replyId }, context) {
      const user = checkAuth(context);

      const post = await Post.findById(postId);
      let comment;

      post.comments.map((c) => {
        if (c.id === commentId) {
          comment = c;
        }
      });

      if (comment) {
        // find index of comment in the array of comments
        const replyIndex = comment.replys.findIndex((r) => r.id === replyId);

        if (comment.replys[replyIndex].username === user.username) {
          comment.replys.splice(replyIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else throw new UserInputError('Post not found');
    },
    async likePost(_, { postId }, context) {
      const user = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === user.username)) {
          post.likes = post.likes.filter(
            (like) => like.username !== user.username
          );
        } else {
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    },
  },
};

module.exports = commentsResolver;
