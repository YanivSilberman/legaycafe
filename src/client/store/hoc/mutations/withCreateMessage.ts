import { graphql } from 'react-apollo';
import { createMessageGql } from '../../gql/mutations';

export default graphql(createMessageGql, {
  name: "createMessage",
  props: ({ createMessage }:any) => ({
    createMessageMutation: (variables:object, cb:any) =>
      createMessage({ variables }).then(() => {
        cb();
      })
    })
})
