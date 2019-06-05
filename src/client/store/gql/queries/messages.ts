import gql from 'graphql-tag';

export default gql`
  query fetchMessages($skip: Int) {
    messages(skip: $skip) {
      _id
      text
      user
      createdAt
    }
    messageCount
  }
`
