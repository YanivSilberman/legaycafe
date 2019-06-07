import { IResolvers } from 'graphql-tools';
import { PubSub } from 'apollo-server';
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { User, Message } from '../models';
import { NUM_MESSAGES } from '../constants';

const pubsub = new PubSub();

const MESSAGE_CREATED = 'MESSAGE_CREATED', USER_TYPING = 'USER_TYPING';

const resolvers: IResolvers = {
  Subscription: {
    messageCreated: { subscribe: () => pubsub.asyncIterator([MESSAGE_CREATED]), },
    userIsTyping: { subscribe: () => pubsub.asyncIterator([USER_TYPING]), }
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
      const messageCreated = new Message({ ...args, user: args.userId });
      console.log({ messageCreated });
      await messageCreated.save((err) => err && console.log('Message create error', err));
      pubsub.publish(MESSAGE_CREATED, { messageCreated });
      return messageCreated;
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

    async messages(_: void, args: any) {
      const messages = await Message.find().sort({ $natural: -1 })
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
        return await User.findOne({ _id: context.currentUser.sub });
      } else {
        return null
      }
    },
  },
};

export default resolvers;
