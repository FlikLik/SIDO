import { db } from './connection.js'

export const getAllUsers = (code, callback) => {
    const query = 'SELECT COUNT(code) AS count FROM Users WHERE code = ?'
    db.query(query, [code], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}