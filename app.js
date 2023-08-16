const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connect')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    const query = "SELECT * FROM mahasiswa"

    db.query(query, (err, result) => {
        // display data
        response(200, result, "get all data from 'mahasiswa'", res)
    })
})

app.get('/nim', (req, res) => {
    console.log(`find nim: ${req.query.nim}`)

    const query = `SELECT nama FROM mahasiswa WHERE nim = ${req.query.nim}`
    db.query(query, (err, result) => {
        response(200, result, "find mahasiswa name", res)
    })
})

app.post('/login', (req, res) => {
    console.log({ requestFromOutside: req.body });
    res.send('login succesfull')
})

app.put('/profile', (req, res) => {
    console.log({ updateData: req.body });
    res.send('profile updated')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})