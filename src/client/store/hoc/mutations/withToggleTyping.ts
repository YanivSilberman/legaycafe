import { graphql } from 'react-apollo';
import { toggleUserTypingGql } from '../../gql/mutations'

export default graphql(toggleUserTypingGql, {
  name: 'toggleTyping',
  props: ({ toggleTyping }:any) => ({
    toggleUserTypingMutation: (variables:object) => toggleTyping({ variables })
  })
})
