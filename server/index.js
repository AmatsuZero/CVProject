const Koa = require('koa')
const serve = require('koa-static')
const logger = require('koa-logger')()
const path = require('path')
const { SetupLocale } = require('./locales/index')
const { SetupRender } = require('./views/index')
const SetupRoutes = require('./routes/index')
const port = process.env.PORT || 3001

const publicPath = path.join(__dirname, 'public')
const app = new Koa()

SetupLocale(app)
app.use(logger)
app.use(serve(publicPath))

SetupRender(app)
SetupRoutes(app)

app.listen(port)
console.log('[demo] route-simple is starting at port %d', port)
