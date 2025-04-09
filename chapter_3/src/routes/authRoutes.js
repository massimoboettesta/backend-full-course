import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// Register new user endpoint /auth/register
router.post('/register', (req, res) => {
    const {username, password} = req.body
    // Encrypt the password 
    const hashedPassword = bcrypt.hashSync(password, 8)
    // Save the new user and hashedPassword to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)
        
        // now that we have a user, We're going to add their first todo
        const defaultTodo = `Helo :) Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
            VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid,defaultTodo)

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({token})
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login', (req, res) => {

})

export default router