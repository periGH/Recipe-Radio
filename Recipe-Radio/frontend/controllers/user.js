
class UsersControllers {
  /**
   * Get all data
   * @param {ctx} Koa Context
   */
  async login(ctx) {
    console.log("Controller working!")
  }



  // router.get('/user/login', async ctx => {
  //   await app.render(ctx.req, ctx.res, '/user/login', ctx.query)
  //   ctx.respond = false
  // })

}
// export default new UsersControllers()
module.exports = new UsersControllers();