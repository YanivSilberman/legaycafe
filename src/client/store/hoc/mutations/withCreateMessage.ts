import { graphql } from 'react-apollo';
import { createMessageGql } from '../../gql/mutations';

export default graphql(createMessageGql, {
  name: "createMessage",
  props: ({ createMessage }) => ({
    createMessageMutation: (variables, cb) => createMessage({ variables }).then(() => {
      cb();
    })
  })
})
