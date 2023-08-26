const sql = require('mysql')

const db = sql.createConnection({
    host: "localhost", // your local ip / localhost
    user: "root", // your db user (default = root)
    password: "", // your db user password (default = none)
    database: "demodbuniv" // your database
})

module.exports = db