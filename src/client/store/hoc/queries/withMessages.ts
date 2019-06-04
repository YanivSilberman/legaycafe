import { graphql } from 'react-apollo';
import { messagesGql } from '../../gql/queries';
import { newMessageSubscriptionGql } from '../../gql/subscriptions';

export default graphql(messagesGql, {
  name: 'messages',
  options: () => ({
    skip: true
  }),
  props: ({ messages: { error, loading, messages, usersTyping, fetchMore, subscribeToMore } }) => {
    if (error) return null;

    return {
      loading,
      messages,
      refetchMessages: (id) => fetchMore({
        variables: { id },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return Object.assign({}, previousResult, {
            messages: fetchMoreResult.messages
          });
        }
      }),
      subscribeToNewMessages: () => subscribeToMore({
        document: newMessageSubscriptionGql,
        // variables: { chatId: Chat && Chat.id },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, {
            messages: [ ...prev.messages, subscriptionData.data.messageCreated ]
          });
        }
      })
    }
  }
})
