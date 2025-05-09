import { createConnection } from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

export const db = createConnection({
    host: process.env.REACT_APP_DB_HOST,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    database: process.env.REACT_APP_DB_DB,
})

db.connect((err) => {
    if (err) throw err.message
    console.log('Connected to the database')
})
