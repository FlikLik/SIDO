import { createConnection } from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

export const db = createConnection({
    /* host: process.env.REACT_APP_DB_HOST,
     database: process.env.REACT_APP_DB_NAME,
     password: process.env.REACT_APP_DB_PASSWORD,
     user: process.env.REACT_APP_DB_USER,
     */
    host: '132.148.180.150',
    database: 'SIDO',
    password: 'QrTj5g4rYMfxHAh',
    user: 'admin',
})

db.connect((err) => {
    if (err) throw err.message
    console.log('Connected to the database')
})
