const Koa = require('koa')
const serve = require('koa-static')
const logger = require('koa-logger')()
const path = require('path')
const { SetupLocale } = require('locales')
const { SetupRender } = require('./views/index')

const publicPath = path.join(__dirname, 'public')
const app = new Koa()

SetupLocale(app)
app.use(logger)

app.use(serve(publicPath))
SetupRender(app)



app.listen(3000)
console.log('[demo] route-simple is starting at port 3000')
