const express = require ('express')
const app = express()

app.use(express.static(__dirname + '/static', {
	index: 'index.html'
}))

app.listen (3000, () => {
	console.log('Express listening')
})