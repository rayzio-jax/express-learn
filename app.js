const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connect') // connect db config
const response = require('./response') // response on query config

// parser to help logs can read json format
app.use(bodyParser.json())

// displaying all data from db
app.get('/', (req, res) => {
    // sql to display all data
    const query = "SELECT * FROM mahasiswa"

    db.query(query, (err, result) => {
        // display data from query
        response(200, result, "get all data from 'mahasiswa'", res)
    })
})

// display id by taking id from url
app.get('/:id', (req, res) => {
    // catch id from url
    const id = req.params.id

    // display id from 'id'
    res.send(`DISPLAY ID: ${id}`)
})

// find a name from given nim 1
// example: http://localhost:3000/find/nim=10100001 (find a name with nim 10100001)
app.get('/find/nim=:nim', (req, res) => {
    // catch nim from url
    const nim = req.params.nim

    // sql to display name from mahasiswa by given nim
    const query = `SELECT nama FROM mahasiswa WHERE nim = ${nim}`

    // display name from given nim on url
    db.query(query, (err, result) => {
        response(200, result, "find mahasiswa name", res)
    })
})

// find a name from given nim 2
// example: http://localhost:3000/nim?nim=10100001 (find a name with nim 10100001)
app.get('/nim', (req, res) => {
    // display log of nim from query
    console.log(`find nim: ${req.query.nim}`)

    // sql to display name from mahasiswa by given nim
    const query = `SELECT nama FROM mahasiswa WHERE nim = ${req.query.nim}`

    // display mahasiswa from query by nim
    db.query(query, (err, result) => {
        response(200, result, "find mahasiswa name", res)
    })
})

// testing update data (untested)
// app.post('/update-nim', (req, res) => {
//     console.log(`update data: ${req.query.nama}, ${req.query.nim}`)

//     const query = `UPDATE mahasiswa 
//     SET nama='${req.query.nama}' where id=${req.query.nim}`
//     db.query(query, (err, result) => {
//         response(200, result, "update mahasiswa name", res)
//     })
// })

// testing log from method post
app.post('/login', (req, res) => {
    console.log({ requestFromOutside: req.body });
    res.send('login succesfull')
})

// testing log from method put
app.put('/profile', (req, res) => {
    console.log({ updateData: req.body });
    res.send('profile updated')
})

// app runner
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})