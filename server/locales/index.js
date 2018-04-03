const locales = require('koa-locales')
const SillyDateTime = require('silly-datetime')


const SetupLocale = app => locales(app, {
    dir: [__dirname],
    defaultLocale: 'zh-CN'
})

const DateFormatter = ctx => {
    let locale = ctx.__getLocale()
    if(locale !== 'zh-cn')
        locale = 'en'
    SillyDateTime.locate(locale)
    return SillyDateTime
}

export {
    SetupLocale,
    DateFormatter
}
