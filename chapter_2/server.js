//Address
//URL -> http://localhost:8383
const express = require('express')
const app = express()
const PORT = 8383

let data = ['james']

//Middleware
app.use(express.json())

//Type 1 - Window (visual)
app.get('/', (req, res) => {
    console.log('User requested the home page website')
    res.send(`
        <body style="background:grey">
        <h1>DATA:</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is my script')</script>
        `)
})

app.get('/dashboard', (req, res) => {
    res.send(`
        <body>
        <h1>dashboard</h1>
        <a href="/">home</a>
        </body>
        `)
})

//Type 2 - API (non visual)

//CRUD-method: create-post read-get update-put delete-delete

app.get('/api/data', (req, res) => {
    console.log('This is for the data')
    res.send(data)
})

app.post('/api/data', (req, res) => {
    //someone wants to create a user (for examplewhen they click a sign up button)
    const newEntry = req.body
    console.log(newEntry)
    data.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.pop()
    console.log('We deleted the element off the end of the array')
    res.sendStatus(203)
})


app.listen(PORT,() => console.log(`Server has started on port on: ${PORT}`))