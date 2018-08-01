let Koa = require("koa")  //koa是一个类

let app = new Koa()
//获取请求的路径req.url
//req.path
app.use((ctx)=>{
  console.log(ctx.req.path); //ctx.req = req
  console.log(ctx.request.path); //ctx.request是koa自己封装的属性
  console.log(ctx.request.req.path); //ctx.request.req = req
  console.log(ctx.path); //用ctx来代理ctx.request
  ctx.response.body = "hello."
})
app.listen(3000)