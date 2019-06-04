import { graphql } from 'react-apollo';
import { createMessageGql } from '../../gql/mutations';

export default graphql(createMessageGql, {
  name: "createMessage",
  props: ({ createMessage }) => ({
    createMessageMutation: variables => createMessage({ variables })
  })
})
