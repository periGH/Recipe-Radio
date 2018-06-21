import { Document, Schema, Model, model}  from "mongoose";
import * as Bcrypt from "bcryptjs";
import {IUser} from '../interfaces/IUser'

let SALT_WORK_FACTOR = 10;

export interface IUserModel extends IUser, Document {
    comparePassword(password: string): boolean;
}


var UserSchema = new Schema({
	id: Schema.Types.ObjectId,   // for creating the schema only
  username: { 
  	type: String, 
  	required: true
  },
  email: { 
  	type: String, 
  	required: true
  },
  password: {
 	  type: String, 
	  required: true
  }
});

UserSchema.pre('save', async function hashPassword(next) {  
  try {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    const salt = await Bcrypt.genSalt(10);

    // hash the password along with our new salt
    const hash = await Bcrypt.hash(user.password, salt);

    // override the cleartext password with the hashed one
    user.password = hash;
    return next();
  } catch (e) {
    return next(e);
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    Bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
export default model("User", UserSchema)