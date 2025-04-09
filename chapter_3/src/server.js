import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5003

//Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
//Get the directoru name from the file path
const __dirname = dirname(__filename)

//Middleware
app.use(express.json())
//Serves the HTML file form the /public directory
// Tells express to serve all files from the public folder as static assets /file. Any requests for the css files will be resolved to thje public directory.
app.use(express.static(path.join(__dirname, '../public')))

//Serving up the HTML from the /public directory 
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Routes
app.use('/auth', authRoutes)
app.use('/todo', todoRoutes)

app.listen(PORT, ()=>{
    console.log(`Server has started on port:${PORT}`)
})