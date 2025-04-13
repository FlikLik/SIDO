import express, { json } from 'express'
import cors from 'cors'
import { createConnection } from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(json())

const db = createConnection({
    host: 'localhost:3306',
    user: 'admin',
    password: '',
    database: 'sido'
})

db.connect((err) => {
    if (err) throw err
    console.log('Connected to the database')
})