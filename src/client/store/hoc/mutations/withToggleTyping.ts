import { graphql } from 'react-apollo';
import { toggleUserTypingGql } from '../../gql/mutations'

export default graphql(toggleUserTypingGql, {
  name: 'toggleTyping',
  props: ({ toggleTyping }) => ({
    toggleUserTypingMutation: variables => toggleTyping({ variables });
  })
})
