import { db } from './connection.js'

//Sentencia que devuelve los datos de la tabla Companies
export const getAllCompanies = (callback) => {
    const query = 'SELECT * FROM Companies'
    db.query(query, (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que devuelve el numero de usuarios que tienen el mismo code que el que se le pasa por parametro
//Se utiliza para verificar si el usuario existe
export const getAllUsers = (code, callback) => {
    const query = 'SELECT COUNT(code) AS count FROM Users WHERE code = ?'
    db.query(query, [code], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que devuelve el nombre de la empresa que tiene el mismo code que el que se le pasa por parametro
//Se utiliza para buscar el nombre de la empresa en la base de datos
export const getCompany = (code, callback) => {
    const query = 'SELECT name FROM Users JOIN Companies ON Users.id_company = Companies.id WHERE Users.code = ?'
    db.query(query, [code], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que devuelve los resultados de la ECAI para la empresa que tiene el mismo nombre y año que el que se le pasa por parametro
export const getCompanyResults = ([name, year], callback) => {
    const query = 'SELECT educacionValue, capacitacionValue, adiestramientoValue, instruccionValue FROM ECAIresults JOIN Companies ON ECAIresults.id_company = Companies.id WHERE Companies.name = ? AND ECAIresults.year = ?'
    db.query(query, [name, year], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

export const getCompanyDesp = ([name, year], callback) => {
    const query = 'SELECT advance, waste FROM ECAIresults JOIN Companies ON ECAIresults.id_company = Companies.id WHERE Companies.name = ? AND ECAIresults.year = ?'
    db.query(query, [name, year], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}