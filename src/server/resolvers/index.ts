import { IResolvers } from 'graphql-tools';
import { PubSub } from 'apollo-server';
import uuid from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { User, Message } from '../models';

const pubsub = new PubSub();

export const secret = "RvvnOnrSHWBwW9Ohz-EbmqClaSibKwoFuHSlZa68Rc_EWUVF6YOpTMlXgt07pVsPAvH89J9uO39fyFclkt0wqNmS2k4rxZ5vItRHRqivGLVFO1ECqStppvhv-MN5uvEJ_twcDz7kL8rb8xoapfKltcmHkO6z79yfOjrkNjMmycVOJXc0vb61S1LC49r3Cu-YRh6k0n_sU16DzfOfqktvCgAsYyR-LcHYNlxUo08yVLuifv773K41SrVc5GYBkcgdvO4ojBjtWt-BqlV9uQCQBp4_GFry3T4PZLKS-XvEd70m8T8T3uPR5DTKYFqPk5RKR04iKVcYdx1U71gKmsskcQ";

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
        return isMatch ? jwt.sign({ sub: user._id }, secret) : false;
      }

      return false;
    },
    async createUser(root: any, args: any, context: any) {
      const user = new User(args);
      await user.save((err) => err && console.log('User create error', err));
      if (user) {
        return jwt.sign({ sub: user._id }, secret);
      }
      return false;
    },
    async createMessage(root: any, args: any, context: any) {
      const messageCreated = new Message({ ...args, user: args.userId });
      await messageCreated.save((err) => err && console.log('Message create error', err));
      pubsub.publish(MESSAGE_CREATED, { messageCreated });
      return messageCreated;
    },
    toggleUserTyping(root: any, args: any, context: any) {
      console.log({ args });
      const userIsTyping = args;
      pubsub.publish(USER_TYPING, { userIsTyping });
      return true;
    },
  },
  Query: {
    async messages(_: void, args: void) {
      const messages = await Message.find({}, null, {sort: '-createdAt'}).limit(10);
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
