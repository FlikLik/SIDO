import { createConnection } from 'mysql'

export const db = createConnection({
    host: '132.148.180.150',
    user: 'admin',
    password: 'QrTj5g4rYMfxHAh',
    database: 'SIDO'
})

db.connect((err) => {
    if (err) throw err.message
    console.log('Connected to the database')
})
