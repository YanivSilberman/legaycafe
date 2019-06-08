import { graphql } from 'react-apollo';
import { userGql } from '../../gql/queries';

export default graphql(userGql, {
  name: 'user',
  props: ({ user: { error, loading, User } }: any) => {
    if (error) throw(error);

    return {
      User,
      UserLoading: loading
    }
  }
})
