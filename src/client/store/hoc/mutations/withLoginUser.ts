import { graphql } from 'react-apollo';
import { loginUserGql } from '../../gql/mutations';

export default graphql(loginUserGql, {
  name: "loginUser",
  props: ({ loginUser }:any) => ({
    loginUserMutation: (variables: object) => loginUser({ variables })
  })
})
