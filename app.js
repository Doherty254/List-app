import express from 'express'

const app = express()

// set template engine and provide extension
app.set('view engine', 'ejs')

// source static files from public folder
app.use(express.static('public'))

// index route (root path)
app.get('/', (req, res) => {
    let title = 'Home'
    res.render('index', {title: title})
})

// list route
app.get('/list', (req, res) => {
    let title = 'List'
    const list = [
        'Wake up',
        'Read a book',
        'Take a shower',
        'Prepare breakfast',
        'Open VS Code'
    ]
    res.render('list', {title: title, list: list})
})

// 404 Error
app.get('*',(req,res) => {
    res.render('404')
})

// start server on localhost:3000
app.listen(3000)