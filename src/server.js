import { getAllUsers } from './Backend/queries.js'
import { getAllCompanies } from './Backend/queries.js'

import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/login', (req, res) => {
    const { code } = req.body
    getAllUsers([code], (err, results) => {
        if (err) throw err
        res.send({ count: results[0].count })
    })
})

app.get('/companies', (req, res) => {
    getAllCompanies((err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})