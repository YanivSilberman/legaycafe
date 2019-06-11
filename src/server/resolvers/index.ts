import { IResolvers } from 'graphql-tools';
import { PubSub, withFilter } from 'apollo-server';
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { User, Message, Chat } from '../models';
import { NUM_MESSAGES } from '../constants';

const pubsub = new PubSub();

const
  CHAT_MESSAGE_CREATED = 'CHAT_MESSAGE_CREATED',
  MESSAGE_CREATED = 'MESSAGE_CREATED',
  USER_TYPING = 'USER_TYPING';

const resolvers: IResolvers = {
  Subscription: {
    messageCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_CREATED),
        async (payload, variables, context) => {
          const found = await Chat.findOne({
            users: { $regex : `.*${context.currentUser.sub}.*` },
            _id: payload.messageCreated.chat.toString()
          });

          return !!found;
        },
      ),
    },
    chatMessageCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(CHAT_MESSAGE_CREATED),
        (payload, variables) => {
          const found = payload.chatMessageCreated.chat.toString() === variables.chat;
          return found;
        },
      ),
    },
    userIsTyping: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USER_TYPING),
        (payload, variables) => {
          return payload.userIsTyping.chat.toString() === variables.chat;
        },
      ),
    }
  },
  Mutation: {
    async loginUser(root: any, args: any, context: any) {
      const user = await User.findOne({ email: args.email });
      if (user && user !== null) {
        // @ts-ignore
        const isMatch = await user.comparePassword(args.password);
        return isMatch ? jwt.sign({ sub: user._id }, process.env.JWT_SECRET) : false;
      }

      return false;
    },
    async createUser(root: any, args: any, context: any) {
      const user = new User(args);
      await user.save((err) => err && console.log('User create error', err));
      if (user) {
        return jwt.sign({ sub: user._id }, process.env.JWT_SECRET);
      }
      return false;
    },
    async createMessage(root: any, args: any, context: any) {
      const chatMessageCreated = new Message({ ...args, user: args.userId });
      await chatMessageCreated.save((err) => err && console.log('Message create error', err));
      pubsub.publish(CHAT_MESSAGE_CREATED, { chatMessageCreated });
      // pubsub.publish(MESSAGE_CREATED, { messageCreated });
      return chatMessageCreated;
    },
    toggleUserTyping(root: any, args: any, context: any) {
      const userIsTyping = args;
      pubsub.publish(USER_TYPING, { userIsTyping });
      return true;
    },
  },
  Query: {
    async messageCount(_: void, args: void) {
      return await Message.collection.count()
    },

    async Chat(_: void, args: any, context: any) {
      const { users } = args;
      if (!users || users === context.currentUser.sub) return null;

      // get or create chat with user list
      const chat = await Chat.findOneAndUpdate({
        users
      }, {}, {upsert: true, 'new': true});

      return chat;
    },

    async messages(_: void, args: any) {
      const { chat } = args;

      // get messages from chat
      const messages = await Message.find({ chat }).sort({ $natural: -1 })
        .skip(args.skip || 0)
        .limit(NUM_MESSAGES);

      return messages.reverse();
    },

    async users(_: void, args: void) {
      const users = await User.find();
      return users;
    },

    usersTyping(_: void, args: void): Array<object> {
      return [];
    },

    async User(_: void, args: void, context: any) {
      if (context.currentUser) {
        const u = await User.findOne({ _id: context.currentUser.sub });
        return {
          ...u.toObject(),
          chats: await Chat.find({ users: { $regex : `.*${context.currentUser.sub}.*` } })
        };
      } else {
        return null
      }
    },
  },
};

export default resolvers;
