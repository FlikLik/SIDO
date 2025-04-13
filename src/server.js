import express, { json } from 'express'
import cors from 'cors'
import { createConnection } from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(json())

const db = createConnection({
    host: '132.148.180.150',
    user: 'admin',
    password: 'QrTj5g4rYMfxHAh',
    database: 'SIDO'
})

db.connect((err) => {
    if (err) throw err
    console.log('Connected to the database')
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})