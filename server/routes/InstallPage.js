const path = require('path')
const Router = require('koa-router')
const { projects } = require('../db')
const { DateFormatter } = require('../locales/index')
const { promisify } = require('util')
const stat = promisify(require('fs').stat)

const isIPAExist = async (uuid, timestamp) => {
    const assetPath = path.join(__dirname, '../public/ipa', uuid, timestamp)
    const stats = await stat(assetPath)
    return stats.isDirectory() || stats.isFile()
}

const install = new Router()
const showInstallPage = () => install.get('/:token', async ctx => {
    const project = await projects().findOne({token: ctx.params['token']})
    let ipaExist
    try {
        ipaExist = await isIPAExist(project.owner, project.timestamp)
    } catch (e) {
        ipaExist = false
    }
    if (project && ipaExist) {
        return await ctx.render('project', {
            project: Object.assign({}, project, {updateTime: DateFormatter.fromNow(project.timestamp*10000)}),
            host: process.env.HOST
        })
    }
    return await ctx.render('404')
})

export {
    isIPAExist,
    showInstallPage
}
