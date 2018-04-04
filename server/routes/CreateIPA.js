const Router = require('koa-router')
const { spawn } = require('child_process')
const path = require('path')
const { globalState } = require('../globals/globals')
const { giveResponse } = require('../globals/globals')
const { isIPAExist } = require('./InstallPage')
const Persistence = require('../db')
const MailCenter = require('../service/mail')

const runCreateIPAs = async (projectStatus, userStatus, ownerStatus, token, origin) => {
    const option = {
        timestamp: projectStatus.timestamp,
        access_token: token,
        email: ownerStatus.email,
        password: ownerStatus.password,
        uuid: ownerStatus.uuid,
    }
    globalState.jobs.push(option)
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
    if (globalState.isCreating) return
    const job = globalState.jobs.shift()
    try {
        const ipaExist = await isIPAExist(job.uuid, job.timestamp)
        if (ipaExist) {
            await Persistence.save(token, projectStatus, ownerStatus)
            MailCenter.sendMail(userStatus.email, userStatus.name, "CVProject", `${origin}/${token}`, true)
        } else {
            throw new Error('ipa not exist')
        }
    } catch (e) {
        console.log(e.stack)
        globalState.isCreating = true
        const exitCode = await createIpa(job)
        if(exitCode === 0) {
            await Persistence.save(token, projectStatus, ownerStatus)
            MailCenter.sendMail(userStatus.email, userStatus.name, "CVProject", `${origin}/${token}`, true);
        } else {
            MailCenter.sendMail(userStatus.email, userStatus.name, "CVProject", `${origin}/${token}`, false);
        }
        globalState.isCreating = false
        if(globalState.jobs.length > 0) {
            return await createIPAs(userStatus, projectStatus, ownerStatus, token, origin)
        }
    }
}

const create = new Router()
create.get('/:token/create', async ctx => {
    await giveResponse(ctx.response, 0)
    await runCreateIPAs(ctx.state.projectStatus, ctx.state.userStatus, ctx.state.ownerStatus, ctx.params['token'], ctx.request.origin)
})

module.exports = create
