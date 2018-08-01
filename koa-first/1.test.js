let Koa = require("./koa/application")

let app = new Koa()

app.use((req,res)=>{
  res.end('hello koa~')
})
app.listen(3001)