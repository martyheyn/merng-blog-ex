import { gql } from '@apollo/client';

//  User Mutations and Query
export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      bio
      createdAt
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      bio
      createdAt
      token
    }
  }
`;

// Get user
export const FETCH_PROFILE_QUERY = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      id
      email
      username
      bio
      createdAt
    }
  }
`;

// Edit the users profile
export const EDIT_PROFILE_MUTATION = gql`
  mutation editUser($userId: ID!, $email: String!, $bio: String!) {
    editUser(userId: $userId, email: $email, bio: $bio) {
      id
      email
      username
      bio
      createdAt
    }
  }
`;

// Delete User
export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId)
    # No return needed
  }
`;

// Post Graphql:
// Post Mutations and Query
export const FETCH_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      title
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
        replys {
          id
          username
          createdAt
          body
        }
      }
      # group
      tags
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
        replys {
          id
          username
          createdAt
          body
        }
      }
      tags
    }
  }
`;

// Get by Group/ took group out for testing
export const FETCH_GROUP_POST_QUERY = gql`
  query getGroupPosts($groupName: String!) {
    getGroupPosts(groupName: $groupName) {
      id
      title
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
        replys {
          id
          username
          createdAt
          body
        }
      }
      tags
    }
  }
`;

// Get by Group
export const FETCH_TAG_POST_QUERY = gql`
  query getTagPosts($tagName: String!) {
    getTagPosts(tagName: $tagName) {
      id
      title
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
        replys {
          id
          username
          createdAt
          body
        }
      }
      tags
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(title: $title, body: $body) {
      id
      title
      body
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
        replys {
          id
          body
          username
          createdAt
        }
      }
      commentCount
    }
  }
`;

// Delete stuff
// Delete post graphql mutation
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
    # No return needed
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

// Delete comment mutation
export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
        replys {
          id
          username
          createdAt
          body
        }
      }
      commentCount
    }
  }
`;

export const CREATE_REPLY_MUTATION = gql`
  mutation createReply($postId: ID!, $commentId: ID!, $body: String!) {
    createReply(postId: $postId, commentId: $commentId, body: $body) {
      id
      comments {
        id
        body
        username
        createdAt
        replys {
          id
          body
          username
          createdAt
        }
      }
    }
  }
`;

// Delete comment mutation
export const DELETE_REPLPY_MUTATION = gql`
  mutation deleteReply($postId: ID!, $commentId: ID!, $replyId: ID!) {
    deleteReply(postId: $postId, commentId: $commentId, replyId: $replyId) {
      id
      comments {
        id
        username
        createdAt
        body
        replys {
          id
          username
          createdAt
          body
        }
      }
      commentCount
    }
  }
`;

// Edit the users post on the single page
export const EDIT_POST_MUTATION = gql`
  mutation editPost($postId: ID!, $body: String!) {
    editPost(postId: $postId, body: $body) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
