module.exports = () => {

    const express = require('express')
    const app = express()
    const port = 2334

    app.get('/', (req, res) => {
    res.send('Online')
    })

    app.listen(port, () => {})

}