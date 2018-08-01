let Koa = require("koa")  //koa是一个类

let app = new Koa() //实现最常用的listen use 方法
app.use((ctx,next)=>{
  ctx.body = "hello koa!"
})
app.listen(3000)