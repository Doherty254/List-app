import express from 'express'

const app = express()

// set template engine and provide extension
app.set('view engine', 'ejs')

// source static files from public folder
app.use(express.static('public'))

// configuration to access form input when submitted
app.use(express.urlencoded({extended: false}))


// LIST OF ITEMS
const list = [
    'Brown Bread',
    '2Kgs of Sugar',
    'Coffee',
    'Fresh Fri Cooking Oil',
    'Soko Ugali - 10Kgs'
]

// index route (root path)
app.get('/', (req, res) => {
    let title = 'Home'
    res.render('index', {title: title})
})

// list route
app.get('/list', (req, res) => {
    let title = 'List'
  
    res.render('list', {title: title, list: list})
})

// ADD ITEM TO LIST
app.post('/add-item', (req,res) => {
    let item = req.body.item
    list.push(item)
    res.redirect('/list')
})

// 404 Error
app.get('*',(req,res) => {
    let title = 'Page Not Found'
    res.render('404', {title:title})
})

// start server on localhost:3000
app.listen(3000)