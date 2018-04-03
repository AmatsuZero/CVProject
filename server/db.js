const db = require('monk')('localhost/mbipa')

const projects = async () => db.get('projects')
const users = async () => db.get('users')

const saveStatus = (token, projStatus, userStatus) => {

}

export {
    projects,
    users
}
