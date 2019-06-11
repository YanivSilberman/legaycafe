import gql from 'graphql-tag';

export default gql`
  query usersTyping($chat: ID!) {
    usersTyping(chat: $chat) {
      _id
      isTyping
    }
  }
`
