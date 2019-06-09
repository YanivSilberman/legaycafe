import { graphql } from 'react-apollo';
import { messagesGql } from '../../gql/queries';
import { newMessageSubscriptionGql } from '../../gql/subscriptions';
import { NUM_MESSAGES } from '../../../../server/constants';

export default graphql(messagesGql, {
  name: 'messages',
  options: (props:any) => ({
    fetchPolicy: 'no-cache'
  }),
  props: ({
    ownProps: { userId },
    messages: { error, loading, messages, messageCount, fetchMore, subscribeToMore }
  }:any) => {
    if (error) return null;

    return {
      loading,
      messages,
      isMoreMessages: messages && messageCount > messages.length || false,
      moreMessages: (skip:number, cb:any) => fetchMore({
        variables: { skip },
        updateQuery: (previousResult:any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          cb();
          return Object.assign({}, previousResult, {
            messages: [ ...fetchMoreResult.messages , ...previousResult.messages ],
            isMoreMessages: fetchMoreResult.messages.length < NUM_MESSAGES
          });
        }
      }),
      subscribeToNewMessages: () => subscribeToMore({
        document: newMessageSubscriptionGql,
        // variables: { chatId: Chat && Chat.id },
        updateQuery: (prev:any, { subscriptionData }: any) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, {
            messages: [ ...prev.messages, subscriptionData.data.messageCreated ]
          });
        }
      })
    }
  }
})
