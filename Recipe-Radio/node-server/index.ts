import * as http from "http";

import { connect } from "mongoose";
import { port, mongo_url } 	from "config";
import User from "./models/users"
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'

const url = mongo_url;

let username = null;
let users = null;


const options = {

};

connect(url, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    username: 'bigbassroller400',
    email: 'bigbassroller900@bigbassroller700.com',
    password: 'Password123'
});
console.log("testUser: ", testUser)

// Make this async
testUser.save(function (err, testUser) {
	console.log("testUser save!!!!!!!")
    if (err) return console.error(err);
});

User.find(function (err, result) {
  if (err) return console.error(err);
  users = result;
})


User.findOne({username: "bigbassroller400"}, function (err, result) { 
  if (err) return console.error(err);
  username = result; 
});

const app = new Koa()
const router = new Router();

app.use(bodyParser());

router.get('/', (ctx) => ctx.body = username);

app.use(router.routes());

// Start the application
app.listen(port, () => 
  console.log(`Server is running at http://localhost:${port}/`)
);
export default app