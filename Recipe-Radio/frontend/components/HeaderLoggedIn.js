import cookies from 'next-cookies'
import jwt_decode from 'jwt-decode'
import ActiveLink from './ActiveLink'

const {token} = cookies(ctx)

console.log("Header token? ", token)

var decoded = jwt_decode(token);
console.log("decoded: ", decoded);
const user_id = decoded.userid;
console.log("user_id: ", user_id)

export default () => (
  <div>
  	Hello USERNAME
    <ActiveLink href='/'>Home</ActiveLink>
    <ActiveLink href='/user/profile'>Profile</ActiveLink>
    <ActiveLink href='/user/logout'>logout</ActiveLink>
  </div>
)