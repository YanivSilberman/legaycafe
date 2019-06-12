import { graphql } from 'react-apollo';
import { toggleUserTypingGql } from '../../gql/mutations'

interface toggleTypingProps {
  chat: string;
}


export default graphql(toggleUserTypingGql, {
  name: 'toggleTyping',
  options: ({ chat }: toggleTypingProps) => ({
    variables: { chat }
  }),
  props: ({ ownProps: { chat, userId }, toggleTyping }:any) => ({
    toggleUserTypingMutation: (variables:object) => toggleTyping({ variables: {
      ...variables,
      chat,
      _id: userId
    } })
  })
})
