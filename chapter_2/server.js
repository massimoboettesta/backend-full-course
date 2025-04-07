//Address
//URL -> http://localhost:8383
const express = require('express')
const app = express()
const PORT = 8383

//Type 1 - Window (visual)
app.get('/', (req, res) => {
    res.send('<h1>homepage</h1>')
})

app.get('/dashboard', (req, res) => {
    res.send('<h1>dashboard</h1>')
})

//Type 2 - API (non visual)

app.listen(PORT,() => console.log(`Server has started on port on: ${PORT}`))