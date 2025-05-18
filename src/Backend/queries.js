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


//Sentencia que devuelve el valor del avance y desperdicio organizacional de la empresa que tiene el mismo nombre y año que el que se le pasa por parametro
export const getCompanyDesp = ([name, year], callback) => {
    const query = 'SELECT advance, waste FROM ECAIresults JOIN Companies ON ECAIresults.id_company = Companies.id WHERE Companies.name = ? AND ECAIresults.year = ?'
    db.query(query, [name, year], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que devuelve los resultados de la NOM-035 para la empresa que tiene el mismo nombre que el que se le pasa por parametro
export const getNOMRes = ([name, guide], callback) => {
    const query = 'SELECT domain, rate, interpretation FROM NOMresults JOIN Companies ON NOMresults.id_company = Companies.id WHERE Companies.name = ? AND guide = ?'
    db.query(query, [name, guide], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que devuelve los departamentos de la empresa que tiene el mismo nombre que el que se le pasa por parametro
export const getDeps = (name, callback) => {
    const query = 'SELECT DISTINCT Users.area FROM Users WHERE Users.id_company = (SELECT id FROM Companies WHERE Companies.name = ?)'
    db.query(query, [name], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que devuelve los resultados de los KPIs ya sea de un departamento o de un empleado de acuuerdo al nombre y año que se le pase como parámetro
export const getKPIS = ([name, year], callback) => {
    let query
    switch (true) {
        case /^[a-zA-Z]+$/.test(name): query = 'SELECT A, B, C, D, E, F, G, H, I, J, K, L, M, N FROM OCQresults WHERE depName = ? AND year = ?'
            break
        case /\d/.test(name): query = 'SELECT A, B, C, D, E, F, G, H, I, J, K, L, M, N FROM OCQresults JOIN Users ON Users.id = OCQresults.id_employee WHERE Users.code = ? AND OCQresults.year= ?'
            break
    }
    db.query(query, [name, year], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Senttencia que devuelve los empleados de acuerdo al nombre de la empresa que tiene el mismo nombre que el que se le pasa por parametro
export const getEmployees = ([company], callback) => {
    const query = 'SELECT Users.code FROM Users JOIN Companies ON Users.id_company = Companies.id WHERE Companies.name = ?'
    db.query(query, [company], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que devuelve los datos de los empleados de acuerdo al código que se le pase cómo parámetro
export const getEmployeesData = ([code], callback) => {
    const query = 'SELECT position, area FROM Users WHERE code = ?'
    db.query(query, [code], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que devuelve la lista de empleados cuyos resuultados de KPIs fueron tomados en 2024 y 2025
export const getEmployeesBothYears = ([name], callback) => {
    const query = 'SELECT DISTINCT Users.code FROM OCQresults JOIN Users ON OCQresults.id_employee = Users.id JOIN Companies ON Users.id_company = Companies.id WHERE OCQresults.year IN (2024, 2025) AND Companies.name = ? GROUP BY Users.code HAVING COUNT(DISTINCT OCQresults.year) = 2 ORDER BY Users.id'
    db.query(query, [name], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

export const insertCompany = ([name, line, mision, vision], callback) => {
    const query = 'INSERT INTO Companies (name, line, mision, vision) VALUES (?, ?, ?, ?)'
    db.query(query, [name, line, mision, vision], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

export const insertUser = ([code, id_Company, position, area, isAdmin], callback) => {
    const query = 'INSERT INTO Users (code, id_Company, position, area, isAdmin) VALUES (?, ?, ?, ?, ?)'
    db.query(query, [code, id_Company, position, area, isAdmin], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

