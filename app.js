import express from 'express'
import mysql from 'mysql'

const app = express()

// db configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list_app'
})

// set template engine and provide extension
app.set('view engine', 'ejs')

// source static files from public folder
app.use(express.static('public'))

// configuration to access form input when submitted
app.use(express.urlencoded({extended: false}))


// LIST OF ITEMS
// const list = [
//     'Brown Bread',
//     '2Kgs of Sugar',
//     'Coffee',
//     'Fresh Fri Cooking Oil',
//     'Soko Ugali - 10Kgs'
// ]

// index route (root path)
app.get('/', (req, res) => {
    let title = 'Home'
    res.render('index', {title: title})
})

// list route
app.get('/list', (req, res) => {
    let title = 'List'
  
    let sql = 'SELECT * FROM list'

    connection.query(
        sql, (error, results) => {
            res.render('list', {title: title, list: results})
        }
    )

    
})

// ADD ITEM TO LIST
app.post('/add-item', (req,res) => {
    let item = req.body.item

    let sql = 'INSERT INTO list (item) VALUES (?)'

    connection.query(
        sql,
        [item],
        (error, results) => {
            res.redirect('/list')
        }
    )
})

// DISPLAY EDIT ITEM FORM

app.get('/edit/:id', (req, res) => {

    let sql = 'SELECT * FROM list WHERE id = ?'

    connection.query(
        sql,
        [parseInt(req.params.id)],
        (error, result) => {
            res.render('edit', {list: result[0], title: 'Edit Item'})
        }
    )
})
    

// SUBMITTING EDIT ITEM FORM
app.post('/edit/:id', (req, res) => {
    
    let item = req.body.item

    let sql ='UPDATE list SET item = ? WHERE id = ?'

    connection.query(
        sql,
        [item, parseInt(req.params.id)],
        (error, result) => {
            res.redirect('/list')
        }
    )

})

// DELETE ITEM FROM LIST
app.get('/delete/:id', (req, res) =>{
    let sql = 'DELETE FROM list WHERE id = ?'

    connection.query(
        sql,
        [parseInt(req.params.id)],
        (error, results) => {
            res.redirect('/list')
        }
    )
})

// 404 Error
app.get('*',(req,res) => {
    let title = 'Page Not Found'
    res.render('404', {title:title})
})

// start server on localhost:3000
app.listen(3000)