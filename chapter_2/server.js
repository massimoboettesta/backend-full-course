const express = require('express')
const app = express()
const PORT = 8383


app.listen(PORT,() => console.log(`Server has started on port on: ${PORT}`))

app.get('/',(req, res) =>{
    res.send('Hello world!')
})

