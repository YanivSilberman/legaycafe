import gql from 'graphql-tag';

export default gql`
  query {
    usersTyping {
      _id
      isTyping
    }
  }
`
