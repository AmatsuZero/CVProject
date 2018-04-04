exports.globalState = {
    isCreating: true,
    jobs: []
}

exports.giveResponse = (response, msg) => {
    response.body = JSON.stringify({
        err: msg
    })
    response.status = 200
    return Promise.resolve()
}
