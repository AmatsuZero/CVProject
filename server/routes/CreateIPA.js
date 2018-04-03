const co = require('co')
const rimraf = require('rimraf')
const { spawn } = require('child_process')
const { isCreating, jobs } = require('../globals/globals')

const runCreateIPAs = async (project, userStatus, ownerStatus, downloadStatus, token, origin) => {

}

const createIpa = (job) => {
    return new Promise(((resolve, reject) => {
        const {
            name,
            icon,

        } = job
    }))
}

const cleanIPA = (path) => {
    return new Promise(((resolve, reject) => rimraf(path, err => {
        if (err) reject(err);
        resolve()
    })))
}

const createIPAs = async (userStatus, projectStatus, ownerStatus, token, origin) => {
    if (isCreating) return
    const job = jobs.shift()

}

