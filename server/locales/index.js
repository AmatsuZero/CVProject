const locales = require('koa-locales')
const SillyDateTime = require('silly-datetime')

exports.SetupLocale = app => locales(app, {
    dir: [__dirname],
    defaultLocale: 'zh-CN'
})

exports.DateFormatter = ctx => {
    let locale = ctx.__getLocale()
    if(locale !== 'zh-cn')
        locale = 'en'
    SillyDateTime.locate(locale)
    return SillyDateTime
}
