import { graphql } from 'react-apollo';
import { toggleUserTypingGql } from '../../gql/mutations'

export default graphql(toggleUserTypingGql, {
  name: 'toggleTyping',
  options: ({ chat }) => ({
    variables: { chat }
  }),
  props: ({ toggleTyping }:any) => ({
    toggleUserTypingMutation: (variables:object) => toggleTyping({ variables })
  })
})
