import * as jwt from 'jsonwebtoken'
import * as Bcrypt from "bcryptjs";
import User   from '../models/users'

export default async(ctx) => {
  console.log("ctx.request.body: ", ctx.request.body)
  let user = ctx.request.body
  const {username, email, password} = ctx.request.body
  

  user = await User.findOne({ $or:[{username:username}, {'email': email}]}).select('password')
 
  console.log("user: ", user)

  if (Bcrypt.compareSync(ctx.request.body.password, user.password)) {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign({
        role: 'user',
        userid: user._id,
      }, 'YourKey'), // Store this key in an environment variable
      message: 'Successful Authentication',
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication Failed',
    };
  }
  console.log("ctx.body: ", ctx.body)
  return ctx;
}