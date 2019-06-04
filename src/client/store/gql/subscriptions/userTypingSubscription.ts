import gql from 'graphql-tag';

export default gql`
  subscription userIsTyping {
    userIsTyping {
      _id
      isTyping
    }
  }
`;;
