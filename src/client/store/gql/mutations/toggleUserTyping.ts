import gql from 'graphql-tag';

export default gql`
  mutation toggleUserTyping($_id: ID!, $isTyping: Boolean!) {
    toggleUserTyping(_id: $_id, isTyping: $isTyping)
  }
`;
