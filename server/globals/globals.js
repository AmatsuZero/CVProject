let isCreating = true
const jobs = []

const giveResponse = (response, msg) => {
    response.body = JSON.stringify({
        err: msg
    })
    response.status = 200
    return Promise.resolve()
}

export {
    isCreating,
    jobs,
    giveResponse
}
