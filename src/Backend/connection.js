import { createConnection } from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

export const db = createConnection({
    host: process.env.REACT_APP_DB_HOST,
    database: process.env.REACT_APP_DB_NAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    user: process.env.REACT_APP_DB_USER,
})

try {
    db.connect((err) => {
        if (err) console.log(err)
        console.log('Connected to the database')
    })
} catch (err) {
    console.log(err)
}
