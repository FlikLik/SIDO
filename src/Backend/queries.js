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

export const getIsAdmin = ([code], callback) => {
    const query = 'SELECT isAdmin FROM Users WHERE code = ?'
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

//Sentencia que inserta una nueva empresa en la base de datos desde el registro
export const insertCompany = ([name, line, mision, vision], callback) => {
    const query = 'INSERT INTO Companies (name, line, mision, vision) VALUES (?, ?, ?, ?)'
    db.query(query, [name, line, mision, vision], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que inserta un nuevo usuario en la base de datos desde el registro
export const insertUser = ([code, id_Company, position, area, isAdmin], callback) => {
    const query = 'INSERT INTO Users (code, id_Company, position, area, isAdmin) VALUES (?, ?, ?, ?, ?)'
    db.query(query, [code, id_Company, position, area, isAdmin], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Consultas generales
//Usuarios
export const getUsers = ([name], callback) => {
    const query = 'SELECT * FROM Users WHERE id_Company = (SELECT id FROM Companies WHERE name = ?)'
    db.query(query, [name], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//ECAI
export const getECAI = ([name], callback) => {
    const query = 'SELECT id, educacionValue, capacitacionValue, adiestramientoValue, instruccionValue, advance, waste, year FROM ECAIresults WHERE id_company = (SELECT id FROM Companies WHERE name = ?)'
    db.query(query, [name], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Inserciones
//Sentencia que inserta un nuevo usuario en la base de datos desde el panel de control
export const addUser = ([code, name, position, area, isAdmin], callback) => {
    const query = 'INSERT INTO Users (code, id_company, position, area, isAdmin) VALUES (?, (SELECT id FROM Companies WHERE name = ?), ?, ?, ?)'
    db.query(query, [code, name, position, area, isAdmin], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que inserta un nuevo registro de análisis ECAI en la base de datos
export const insertECAI = ([name, eduVal, capVal, adiVal, insVal, advance, waste, year], callback) => {
    const query = 'INSERT INTO ECAIresults (id_company, educacionValue, capacitacionValue, adiestramientoValue, instruccionValue, advance, waste, year) VALUES ((SELECT id FROM Companies WHERE name = ?), ?, ?, ?, ?, ?, ?, ?)'
    db.query(query, [name, eduVal, capVal, adiVal, insVal, advance, waste, year], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}


//Ediciones
//Sentencia que actualiza el usuario en la base de datos desde el panel de control
export const editUser = ([id, position, area, isAdmin], callback) => {
    const query = 'UPDATE Users SET position = ?, area = ?, isAdmin = ? WHERE id = ?'
    db.query(query, [position, area, isAdmin, id], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que actualiza el registro de análisis ECAI en la base de datos
export const updateECAI = ([name, eduVal, capVal, adiVal, insVal, advance, waste, year], callback) => {
    const query = 'UPDATE ECAIresults SET educacionValue = ?, capacitacionValue = ?, adiestramientoValue = ?, instruccionValue = ?, advance = ?, waste = ?, year = ? WHERE id = ?'
    db.query(query, [eduVal, capVal, adiVal, insVal, advance, waste, year, name], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Eliminaciones
//Sentencia que elimina el usuario en la base de datos desde el panel de control
export const deleteUser = ([id], callback) => {
    const query = 'DELETE FROM Users WHERE id = ?'
    db.query(query, [id], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}

//Sentencia que elimina el registro de análisis ECAI en la base de datos
export const deleteECAI = ([id], callback) => {
    const query = 'DELETE FROM ECAIresults WHERE id = ?'
    db.query(query, [id], (err, results) => {
        if (err) throw err
        return callback(null, results)
    })
}
