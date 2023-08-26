const express = require('express')
const APP = express()
const PORT = 500

const bodyParser = require('body-parser')
const db = require('./connect') // connect db config
const response = require('./response') // response on query config

// parser to help logs can read json format
APP.use(bodyParser.json())

// setup middleware
const middleware = (req, res, next) => {
    // you need "hjK23Wr" key to access data from api
    if (req.query.key == 'hjK23Wr') {
        console.log('[Success 200]: API request sent');
        next()
    } else {
        res.send('[Error 403]: API request forbidden')
    }
}

// set a middleware to be use in every api request
APP.use(middleware);

// displaying all data from db
APP.get('/mahasiswa', (req, res) => {
    // sql to display all data
    const query = "SELECT * FROM mahasiswa"

    db.query(query, (err, fields) => {
        // display data from query
        if (err) throw response(500, "invalid", "error displaying data", res)
        response(200, fields, "get all data from 'mahasiswa'", res)
    })
})

// display nim by taking nim from url
APP.get('/mahasiswa/:nim', (req, res) => {
    // catch id from url
    const nim = req.params.nim

    // query to display name by given nim
    const query = `SELECT * FROM mahasiswa WHERE nim = ${nim}`

    // display name by given nim
    db.query(query, (err, fields) => {
        if (err) throw response(500, "invalid", "error searching data", res)
        if (fields != '') {
            response(200, fields, `Get data by nim: ${nim}`, res)
        }
        else {
            response(404, "Not Found", "error: data not found or not exist", res)
        }
    })
})

APP.post('/mahasiswa', (req, res) => {
    // get data from input
    const { nim, nama, alamat } = req.body

    // query to insert data
    const query = `INSERT INTO mahasiswa (nim, nama, alamat) VALUES
    (${nim}, '${nama}', '${alamat}')`

    // insert data to db
    db.query(query, (err, fields) => {
        if (err) throw response(500, "invalid", "error inserting data", res)
        if (fields?.affectedRows) {
            const data = {
                isSuccess: fields.affectedRows,
                id: fields.insertId
            }
            response(200, data, "data inserted successfully", res)
        }
    })
})

APP.put('/mahasiswa', (req, res) => {
    // get data from input
    const { nim, namaBaru } = req.body

    // query to insert data
    const query = `UPDATE mahasiswa SET nama='${namaBaru}' WHERE nim=${nim}`

    // insert data to db
    db.query(query, (err, fields) => {
        if (err) throw err
        if (err) throw response(500, "invalid", "error updating data", res)
        if (fields?.affectedRows) {
            const data = {
                isUpdated: fields.affectedRows,
                rowsUpdated: fields.changedRows,
                message: fields.message
            }
            response(200, data, "data updated successfully", res)
        } else {
            response(404, "data not found or not exist", "error", res)
        }
    })
})

APP.delete('/mahasiswa', (req, res) => {
    // get nim data
    const { nim } = req.body

    // query to delete given nim
    const query = `DELETE FROM mahasiswa WHERE nim=${nim}`

    // delete data from db with given nim
    db.query(query, (err, fields) => {
        if (err) throw response(500, "invalid", "error", res)
        if (fields?.affectedRows) {
            const data = {
                isDeleted: fields.affectedRows
            }
            response(200, data, "data deleted successfully", res)
        } else {
            response(404, "data not found or not exist", "error", res)
        }
    })
})

// find a name from given nim 2
// example: http://localhost:3000/nim?nim=10100001 (find a name with nim 10100001)
// APP.get('/nim', (req, res) => {
//     // display log of nim from query
//     console.log(`find nim: ${req.query.nim}`)

//     // sql to display name from mahasiswa by given nim
//     const query = `SELECT nama FROM mahasiswa WHERE nim = ${req.query.nim}`

//     // display mahasiswa from query by nim
//     db.query(query, (err, fields) => {
//         response(200, fields, "find mahasiswa name", res)
//     })
// })

// run APP
APP.listen(PORT, () => {
    console.log(`Starting app with port ${PORT}`)
})