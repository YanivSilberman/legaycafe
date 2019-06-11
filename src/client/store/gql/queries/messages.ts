import gql from 'graphql-tag';

export default gql`
  query fetchMessages($skip: Int, $chat: ID!) {
    messages(skip: $skip, chat: $chat) {
      _id
      text
      user
      createdAt
    }
    messageCount(chat: $chat)
  }
`
