import { graphql } from 'react-apollo';
import { usersTypingGql } from '../../gql/queries';
import { userTypingSubscriptionGql } from '../../gql/subscriptions';

export default graphql(usersTypingGql, {
  name: 'usersTyping',
  options: ({ chat }) => ({
    variables: { chat }
  }),
  props: ({ ownProps: { chat }, usersTyping: { error, loading, usersTyping, subscribeToMore } }: any) => {
    if (error) return null;

    return {
      loading,
      usersTyping,
      subscribeToUserTyping: () => subscribeToMore({
        document: userTypingSubscriptionGql,
        variables: { chat },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          if (subscriptionData.data.userIsTyping.isTyping) {
            // add to list
            if (!prev.usersTyping.find(i => i._id === subscriptionData.data.userIsTyping._id)) {
              return Object.assign({}, prev, {
                usersTyping: [ ...prev.usersTyping, subscriptionData.data.userIsTyping ]
              });
            }
          } else {
            // remove
            return Object.assign({}, prev, {
              usersTyping: prev.usersTyping.filter(i => i._id !== subscriptionData.data.userIsTyping._id)
            });
          }
        }
      })
    }
  }
})
