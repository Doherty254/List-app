import express from 'express'

const app = express()

// set template engine and provide extension
app.set('view engine', 'ejs')

// source static files from public folder
app.use(express.static('public'))

// index route (root path)
app.get('/', (req, res) => {
    res.render('index')
})

// list route
app.get('/list', (req, res) => {
    res.render('list')
})

// start server on localhost:3000
app.listen(3000)