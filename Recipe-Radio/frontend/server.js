const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const cors = require('@koa/cors');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const cookiesMiddleware = require('universal-cookie-koa');

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/', ctx.query)
    console.log("Home Controller!")
    ctx.respond = false
  })

  router.get('/user/login', async ctx => {
    await app.render(ctx.req, ctx.res, '/user/login', ctx.query)
    ctx.respond = false
  })

  router.get('/user/sign-up', async ctx => {
    await app.render(ctx.req, ctx.res, '/user/sign-up', ctx.query)
    console.log("user/register page controller!")
    ctx.respond = false
  })

  router.get('/user/password-reset', async ctx => {
    await app.render(ctx.req, ctx.res, '/user/password-reset', ctx.query)
    console.log("user/password-reset page controller!")
    ctx.respond = false
  })

  router.get('/user/profile', async ctx => {
    await app.render(ctx.req, ctx.res, '/user/profile', ctx.query)
    
    ctx.respond = false
    console.log("user/profile page controller!")
  })

  router.get('/repipes', async ctx => {
    await app.render(ctx.req, ctx.res, '/repipes', ctx.query)
    
    ctx.respond = false
    console.log("repipes page controller!")
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    console.log("*!")
    // const initProps = {}
    if (ctx.req && ctx.req.headers) {
      const cookies = ctx.req.headers.cookie;
      console.log("cookies: ", cookies)
      ctx.state.cookies = cookies
    }
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server
    .use(cors())
    .use(router.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})