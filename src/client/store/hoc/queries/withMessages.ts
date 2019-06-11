import { graphql } from 'react-apollo';
import { messagesGql } from '../../gql/queries';
import { newChatMessageSubscriptionGql } from '../../gql/subscriptions';
import { NUM_MESSAGES } from '../../../../server/constants';

interface messagesProps {
  chat: string;
}

export default graphql(messagesGql, {
  name: 'messages',
  options: ({ chat }:messagesProps) => ({
    variables: { chat }
  }),
  props: ({
    ownProps: { userId, chat },
    messages: { error, loading, messages, messageCount, fetchMore, subscribeToMore }
  }:any) => {

    if (error) {
      console.log({error});
      return null
    };

    return {
      loading,
      messages,
      isMoreMessages: messages && messageCount > messages.length || false,
      moreMessages: (skip:number, cb:any) => fetchMore({
        variables: { skip, chat },
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
        document: newChatMessageSubscriptionGql,
        variables: { chat },
        updateQuery: (prev:any, { subscriptionData }: any) => {
          if (!subscriptionData.data) return prev;

          return Object.assign({}, prev, {
            messages: [ ...prev.messages, subscriptionData.data.chatMessageCreated ]
          });
        }
      })
    }
  }
})
