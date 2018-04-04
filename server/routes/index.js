const Router = require('koa-router')
const { install } = require('./InstallPage')
const create = require('./CreateIPA')
const device = require('./AddDevice')

const router = new Router()
router.use('install', install.routes(), install.allowedMethods())
router.use('ipa', create.routes(), create.allowedMethods())
router.use('device', device.routes(), device.allowedMethods())

module.exports = app => {
    app.use(async (ctx, next) => {
        ctx.state.__ = ctx.__.bind(ctx)
        await next()
    })
    app.use(router.routes).use(router.allowedMethods())
    app.use(async (ctx, next) => {
        if (ctx.status === 404)
            await ctx.render('404')
        await next()
    })
}
