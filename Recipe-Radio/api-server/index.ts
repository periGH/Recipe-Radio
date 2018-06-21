import * as http from "http";
import { connect } from "mongoose";
import { port, mongo_url }   from "config";
import User from "./models/users"
import * as logger from 'koa-logger'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'

import router from './routes'


const url = mongo_url;

let username = null;
let users = null;

const options = {

};

connect(url, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

const app = new Koa()


app
  .use(logger())
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());



// Start the application
app.listen(port, () => 
  console.log(`Server is running at http://localhost:${port}/`)
);
export default app