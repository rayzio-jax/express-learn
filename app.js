const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
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