const db = require('./db')
const wrap = require('co-monk')

module.exports = wrap(db.get('projects'))
