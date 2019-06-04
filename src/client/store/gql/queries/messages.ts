import gql from 'graphql-tag';

export default gql`
  query {
    messages {
      _id
      text
      user
    }
  }
`
