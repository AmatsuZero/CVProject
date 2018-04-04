const db = require('monk')('localhost/mbipa')

class PersistenceCenter {
    constructor() {
        this.projects = async () => db.get('projects')
        this.users = async () => db.get('users')
    }

    async findUser(query) {
        const users = await this.users()
        return users.findOne(query)
    }

    async findProject(query) {
        const projects = await this.projects()
        return projects.findOne(query)
    }

    async save(token, ownerStatus) {
        const project = await this.projects().findOne({token})
        if (!project) {
            try {
                await this.projects().insert({owner: ownerStatus.uuid})
            } catch (e) {
                console.log(e.stack)
            }
        } else {
            await this.projects().update({
                owner: ownerStatus.uuid
            })
        }
    }
}

const Persistence = new PersistenceCenter()

module.exports = Persistence
