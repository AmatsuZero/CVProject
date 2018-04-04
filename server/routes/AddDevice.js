const Persistence = require('../db')
const { giveResponse } = require('../globals/globals')
const { decrypt } = require('../util/aes')
const { spawn } = require('child_process')
const rimraf = require('rimraf')
const path = require('path')
const Router = require('koa-router')
const body = require('koa-body')()

const register = (name, udid, email, password) => new Promise(resolve => {
    const child = spawn(path.join(__dirname, '..', 'scripts', 'register_device.sh'),
        [name, udid, email, password], {
            cwd: path.join(__dirname, '..'),
        }
    )
    child.on('exit', exitCode => {
        console.log(`child process exited with code: ${exitCode}`)
        resolve(exitCode)
    })
    child.stdout.on('data', data => console.log(`stdout: ${data}`))
    child.stderr.on('data', data => console.log(`stderr: ${data}`))
})

const addDeviceRoute = new Router()
addDeviceRoute.post('/add', body, async ctx => {
    const {uuid, udid, owner_uuid} = ctx.request.body
    const owner = await Persistence.findUser({uuid: owner_uuid})
    if(!owner)
        return giveResponse(ctx.response, 2)
    try {
        const password = decrypt(owner.password, process.env.SECRET)
        const email = owner.email
        const exitCode = await register(uuid, udid, email, password)
        if (exitCode === 0) {
            await rimraf(path) // Clean IPA
            return giveResponse(ctx.response, 0)
        } else {
            return giveResponse(ctx.response, 1)
        }
    } catch (e) {
        return giveResponse(ctx.response, 1)
    }
})

module.exports = addDeviceRoute
