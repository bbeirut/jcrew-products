const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
const categories = require('./category.json')

app.get('/', cors({ origin: '*' }), (req, res, next) => {
	res.json(categories)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
