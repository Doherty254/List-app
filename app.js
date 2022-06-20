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
        'Brown Bread',
        '2Kgs of Sugar',
        'Coffee',
        'Fresh Fri Cooking Oil',
        'Soko Ugali - 10Kgs'
    ]
    res.render('list', {title: title, list: list})
})

// 404 Error
app.get('*',(req,res) => {
    let title = 'Page Not Found'
    res.render('404')
})

// start server on localhost:3000
app.listen(3000)