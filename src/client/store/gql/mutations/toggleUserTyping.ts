import gql from 'graphql-tag';

export default gql`
  mutation toggleUserTyping($_id: ID!, $isTyping: Boolean!, $chat: ID!) {
    toggleUserTyping(_id: $_id, isTyping: $isTyping, chat: $chat)
  }
`;
