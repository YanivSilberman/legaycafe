import Mongoose from "mongoose";
import bcrypt from "bcrypt";
import moment from "moment";

Mongoose.connect("mongodb+srv://yaniv:1296yyy1296@legaycafe-uurrn.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

var db = Mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
 console.log( 'Connected to mongoose')
})

const { Schema } = Mongoose;
const { Types: { ObjectId } } = Schema;

const UserSchema = new Schema({
  id: ObjectId,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String },
  isTyping: { type: Boolean, default: false },
  messages : [{ type: ObjectId, ref: 'Message' }]
});

UserSchema.pre('save', function (next: any) {
  // @ts-ignore
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err: any, salt: any) {
    if (err) return next(err);

    // hash the password along with our new salt
    // @ts-ignore
    bcrypt.hash(user.password, salt, function(err: any, hash: string) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      // @ts-ignore
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword: string) {
  const pass = this.password;
  return new Promise(function(resolve, reject) {
   // Do async job
    bcrypt.compare(candidatePassword, pass, function(err: any, isMatch: boolean) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  })
};

const MessageSchema = new Schema({
  id: ObjectId,
  text: String,
  user: { type: ObjectId, ref: 'User' },
  createdAt: { type: Date, default: moment().toDate() }
});


export const User = Mongoose.model('User', UserSchema);
export const Message = Mongoose.model('Message', MessageSchema);
