import { graphql } from 'react-apollo';
import { allUsersGql } from '../../gql/queries';


export default graphql(allUsersGql, {
  name: 'users',
  props: ({ users: { error, loading, users } }) => {
    if (error) throw(error);

    return {
      allUsers: users,
      users: users && users.reduce((acc, cur) => {
        acc[cur._id] = cur;
        return acc;
      }, {}),
      usersLoading: loading
    }
  }
})
