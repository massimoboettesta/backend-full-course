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
        const defaultTodo = `Hello :) Add your first todo!`
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
    // we get their email, and we look up the password associated with that email in the database
    // we need to ENCRYPT the password input again, so we compare both encrypted values.
    const {username, password} = req.body

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)
        // if the user does not exist, return out of the function
        if (!user) {return res.status(404).send({ message: "User not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if the password does not match, return out of the function
        if (!passwordIsValid) {return res.status(401).send({message: "Invalid password"})}
        console.log(user)
        //from here we have a successful authentication
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn : '24h'})
        res.json({token})
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router