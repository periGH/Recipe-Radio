import Recipe from "../models/recipes"



class RecipesControllers {
  /**
   * Get all data
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await Recipe.find({})
  }

  /**
   * Register a user
   * @param {ctx} Koa Context
   */
  async add(ctx) {

    try {
      const data = await new Recipe(ctx.request.body).save()
      if (data) {
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
   * Find a recipe
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const data = await Recipe.findById(ctx.params.id)
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
      const data = await Recipe.findByIdAndUpdate(ctx.params.id, ctx.request.body)
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
      const data = await Recipe.findByIdAndRemove(ctx.params.id)
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
export default new RecipesControllers()