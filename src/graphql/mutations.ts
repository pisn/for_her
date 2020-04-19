// tslint:disable
// eslint-disable
// this is an auto generated file. This will be overwritten

export const createConversation = /* GraphQL */ `
  mutation CreateConversation($createdAt: String, $id: ID!, $name: String!) {
    createConversation(createdAt: $createdAt, id: $id, name: $name) {
      createdAt
      id
      messages {
        messages {
          content
          conversationId
          createdAt
          id
          isSent
          sender
        }
        nextToken
      }
      name
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $content: String
    $conversationId: ID!
    $createdAt: String!
    $id: ID!
  ) {
    createMessage(
      content: $content
      conversationId: $conversationId
      createdAt: $createdAt
      id: $id
    ) {
      author {
        cognitoId
        conversations {
          nextToken
        }
        id
        username
        registered
      }
      content
      conversationId
      createdAt
      id
      isSent
      recipient {
        cognitoId
        conversations {
          nextToken
        }
        id
        username
        registered
      }
      sender
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      cognitoId
      conversations {
        nextToken
        userConversations {
          conversationId
          userId
        }
      }
      id
      username
      registered
    }
  }
`;
export const createUserConversations = /* GraphQL */ `
  mutation CreateUserConversations($conversationId: ID!, $userId: ID!) {
    createUserConversations(conversationId: $conversationId, userId: $userId) {
      associated {
        associated {
          conversationId
          userId
        }
        conversation {
          createdAt
          id
          name
        }
        conversationId
        user {
          cognitoId
          id
          username
          registered
        }
        userId
      }
      conversation {
        createdAt
        id
        messages {
          nextToken
        }
        name
      }
      conversationId
      user {
        cognitoId
        conversations {
          nextToken
        }
        id
        username
        registered
      }
      userId
    }
  }
`;
