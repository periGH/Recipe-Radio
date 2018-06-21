import User from "../models/users"



class UsersControllers {
  /**
   * Get all data
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await User.find()
  }

  /**
   * Register a user
   * @param {ctx} Koa Context
   */
  async register(ctx) {
    let canidate  = ctx.request.body
    const {username, email} = ctx.request.body

    canidate = await User.findOne( { $or:[ {'username': username}, {'email': email} ]})

    if (canidate && canidate.username == username) {
      ctx.throw(401, 'THIS USERNAME IS ALREADY TAKEN') 
    }

    if (canidate && canidate.email == email) {
      ctx.throw(401, 'THIS EMAIL IS ALREADY TAKEN') 
    }

    try {
      const data = await new User(ctx.request.body).save()
      if (data) {
        ctx.status = 307;
        ctx.redirect('/authenticate');
        ctx.body = data;        
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' }
      }
      
    } catch (err) {
      ctx.throw(422)
    }
  }

  /**
   * Find a user
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const data = await User.findById(ctx.params.id)
      if (!data) {
        ctx.throw(404)
      }
      ctx.body = data
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * Update a data
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const data = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
      if (!data) {
        ctx.throw(404)
      }
      ctx.body = data
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * Delete a data
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const data = await User.findByIdAndRemove(ctx.params.id)
      if (!data) {
        ctx.throw(404)
      }
      ctx.body = data
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }
}
export default new UsersControllers()