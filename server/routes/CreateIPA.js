const Router = require('koa-router')
const { spawn } = require('child_process')
const path = require('path')
const { isCreating, jobs } = require('../globals/globals')
const { giveResponse } = require('../globals/globals')
const { isIPAExist } = require('./InstallPage')
const { users } = require('../db')
const { decrypt } = require('../util/aes')

const runCreateIPAs = async (projectStatus, userStatus, ownerStatus, token, origin) => {
    const option = {
        timestamp: projectStatus.timestamp,
        access_token: token,
        email: ownerStatus.email,
        password: ownerStatus.password,
        uuid: ownerStatus.uuid,
    }
    jobs.push(option)
    return createIpa(userStatus, projectStatus, ownerStatus, token, origin)
}

const createIpa = job => new Promise(resolve => {
    const child = spawn(path.join(__dirname, '..', 'scripts', 'create_ipa.sh'),
        [job.name, job.icon, job.htmlzip, job.access_token, job.cid, job.timestamp, job.launchImage, job.email, job.password, job.uuid, process.env.HOST],
        {
            cwd: path.join(__dirname, '..'),
        }
    );
    child.on('exit', exitCode => {
        console.log(`child process exited with code: ${exitCode}`);
        resolve(exitCode)
    })
    child.stdout.on('data', (data) => console.log(`stdout: ${data}`))
    child.stderr.on('data', (data) => console.log(`stderr: ${data}`))
})

const createIPAs = async (userStatus, projectStatus, ownerStatus, token, origin) => {
    if (isCreating) return
    const job = jobs.shift()
    try {
        const ipaExist = await isIPAExist(job.uuid, job.timestamp)
    } catch (e) {

    }
}

const create = new Router()
module.exports = () => create.get('/:token/create', async ctx => {
    await giveResponse(ctx.response, 0)

})
