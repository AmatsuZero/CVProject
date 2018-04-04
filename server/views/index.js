const render = require('koa-ejs')

exports.SetupRender = app => render(app, {
    root: __dirname,
    layout:'template',
    viewExt: 'html',
    cache: false,
    debug: true
})
