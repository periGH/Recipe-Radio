import * as Router from 'koa-router'
import UsersControllers from './controllers/users'
import RecipesControllers from './controllers/recipes'
import Authenticate from './middlewares/authenticate'
import jwt from './middlewares/jwt'

const router = new Router();

router
  .get('/api/users/', UsersControllers.find)
  .get('/api/users/:id', UsersControllers.findById)
  .post('/api/users/', UsersControllers.register)
  .put('/api/users/:id', jwt, UsersControllers.update)
  .delete('/api/users/:id', jwt, UsersControllers.delete)

  // Recipe Routes
  .get('/api/recipes/', RecipesControllers.find)
  .get('/api/recipes/:id', RecipesControllers.findById)
  .post('/api/recipes/', RecipesControllers.add)
  .put('/api/recipes/:id', jwt, RecipesControllers.update)
  .delete('/api/recipes/:id', jwt, RecipesControllers.delete)

  // Authentication Routes
  .post('/authenticate', Authenticate)
  .post('/login/', Authenticate)
  //.post('/logout/', LoginControllers.logout)
export default router