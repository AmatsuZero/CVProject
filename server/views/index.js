const render = require('koa-ejs')

const SetupRender = app => render(app, {
    root: __dirname,
    layout:'template',
    viewExt: 'html',
    cache: false,
    debug: true
})

export {
    SetupRender
}
