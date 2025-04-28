import { db } from './connection.js'

export const getAllCompanies = (callback) => {
    const query = 'SELECT * FROM Companies'
    db.query(query, (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

export const getAllUsers = (code, callback) => {
    const query = 'SELECT COUNT(code) AS count FROM Users WHERE code = ?'
    db.query(query, [code], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}