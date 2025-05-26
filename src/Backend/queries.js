import { db } from './connection.js'

//Sentencia que devuelve los datos de la tabla Companies
export const getAllCompanies = (callback) => {
    const query = 'SELECT * FROM Companies'
    try {
        db.query(query, (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err);
    }
}

//Sentencia que devuelve el numero de usuarios que tienen el mismo code que el que se le pasa por parametro
//Se utiliza para verificar si el usuario existe
export const getAllUsers = (code, callback) => {
    const query = 'SELECT COUNT(code) AS count FROM Users WHERE code = ?'
    try {
        db.query(query, [code], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }

}

export const getIsAdmin = ([code], callback) => {
    const query = 'SELECT isAdmin FROM Users WHERE code = ?'
    try {
        db.query(query, [code], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }

}

//Sentencia que devuelve el nombre de la empresa que tiene el mismo code que el que se le pasa por parametro
//Se utiliza para buscar el nombre de la empresa en la base de datos
export const getCompany = (code, callback) => {
    const query = 'SELECT name FROM Users JOIN Companies ON Users.id_company = Companies.id WHERE Users.code = ?'
    try {
        db.query(query, [code], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }

}

//Sentencia que devuelve los resultados de la ECAI para la empresa que tiene el mismo nombre y año que el que se le pasa por parametro
export const getCompanyResults = ([name, year], callback) => {
    const query = 'SELECT educacionValue, capacitacionValue, adiestramientoValue, instruccionValue FROM ECAIresults JOIN Companies ON ECAIresults.id_company = Companies.id WHERE Companies.name = ? AND ECAIresults.year = ?'
    try {
        db.query(query, [name, year], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}


//Sentencia que devuelve el valor del avance y desperdicio organizacional de la empresa que tiene el mismo nombre y año que el que se le pasa por parametro
export const getCompanyDesp = ([name, year], callback) => {
    const query = 'SELECT advance, waste FROM ECAIresults JOIN Companies ON ECAIresults.id_company = Companies.id WHERE Companies.name = ? AND ECAIresults.year = ?'
    try {
        db.query(query, [name, year], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Sentencia que devuelve los resultados de la NOM-035 para la empresa que tiene el mismo nombre que el que se le pasa por parametro
export const getNOMRes = ([name, guide], callback) => {
    const query = 'SELECT domain, rate, interpretation FROM NOMresults JOIN Companies ON NOMresults.id_company = Companies.id WHERE Companies.name = ? AND guide = ?'
    try {
        db.query(query, [name, guide], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err);

    }

}

//Sentencia que devuelve los departamentos de la empresa que tiene el mismo nombre que el que se le pasa por parametro
export const getDeps = (name, callback) => {
    const query = 'SELECT DISTINCT Users.area FROM Users WHERE Users.id_company = (SELECT id FROM Companies WHERE Companies.name = ?)'
    try {
        db.query(query, [name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
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
    try {
        db.query(query, [name, year], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Senttencia que devuelve los empleados de acuerdo al nombre de la empresa que tiene el mismo nombre que el que se le pasa por parametro
export const getEmployees = ([company], callback) => {
    const query = 'SELECT Users.code FROM Users JOIN Companies ON Users.id_company = Companies.id WHERE Companies.name = ?'
    try {
        db.query(query, [company], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err);
    }
}

//Sentencia que devuelve los datos de los empleados de acuerdo al código que se le pase cómo parámetro
export const getEmployeesData = ([code], callback) => {
    const query = 'SELECT position, area FROM Users WHERE code = ?'
    try {
        db.query(query, [code], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Sentencia que devuelve la lista de empleados cuyos resuultados de KPIs fueron tomados en 2024 y 2025
export const getEmployeesBothYears = ([name], callback) => {
    const query = 'SELECT DISTINCT Users.code FROM OCQresults JOIN Users ON OCQresults.id_employee = Users.id JOIN Companies ON Users.id_company = Companies.id WHERE OCQresults.year IN (2024, 2025) AND Companies.name = ? GROUP BY Users.code HAVING COUNT(DISTINCT OCQresults.year) = 2 ORDER BY Users.id'
    try {
        db.query(query, [name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Sentencia que inserta una nueva empresa en la base de datos desde el registro
export const insertCompany = ([name, line, mision, vision], callback) => {
    const query = 'INSERT INTO Companies (name, line, mision, vision) VALUES (?, ?, ?, ?)'
    try {
        db.query(query, [name, line, mision, vision], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Sentencia que inserta un nuevo usuario en la base de datos desde el registro
export const insertUser = ([code, id_Company, position, area, isAdmin], callback) => {
    const query = 'INSERT INTO Users (code, id_Company, position, area, isAdmin) VALUES (?, ?, ?, ?, ?)'
    try {
        db.query(query, [code, id_Company, position, area, isAdmin], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Consultas generales
//Usuarios
export const getUsers = ([name], callback) => {
    const query = 'SELECT * FROM Users WHERE id_Company = (SELECT id FROM Companies WHERE name = ?)'
    try {
        db.query(query, [name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//ECAI
export const getECAI = ([name], callback) => {
    const query = 'SELECT id, educacionValue, capacitacionValue, adiestramientoValue, instruccionValue, advance, waste, year FROM ECAIresults WHERE id_company = (SELECT id FROM Companies WHERE name = ?)'
    try {
        db.query(query, [name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//NOM-035
export const getNOM = ([name], callback) => {
    const query = 'SELECT id, guide, domain, rate, interpretation FROM NOMresults WHERE id_company = (SELECT id FROM Companies WHERE name = ?)'
    try {
        db.query(query, [name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//OCQ
export const getOCQ = ([name], callback) => {
    const query = 'SELECT * FROM OCQresults WHERE id_company = (SELECT id FROM Companies WHERE name = ?)'
    try {
        db.query(query, [name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Inserciones
//Sentencia que inserta un nuevo usuario en la base de datos desde el panel de control
export const addUser = ([code, name, position, area, isAdmin], callback) => {
    const query = 'INSERT INTO Users (code, id_company, position, area, isAdmin) VALUES (?, (SELECT id FROM Companies WHERE name = ?), ?, ?, ?)'
    try {
        db.query(query, [code, name, position, area, isAdmin], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Sentencia que inserta un nuevo registro de análisis ECAI en la base de datos
export const insertECAI = ([name, eduVal, capVal, adiVal, insVal, advance, waste, year], callback) => {
    const query = 'INSERT INTO ECAIresults (id_company, educacionValue, capacitacionValue, adiestramientoValue, instruccionValue, advance, waste, year) VALUES ((SELECT id FROM Companies WHERE name = ?), ?, ?, ?, ?, ?, ?, ?)'
    try {
        db.query(query, [name, eduVal, capVal, adiVal, insVal, advance, waste, year], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

export const insertNOM = ([name, guide, domain, rate, interpretation], callback) => {
    const query = 'INSERT INTO NOMresults (id_company, guide, domain, rate, interpretation) VALUES ((SELECT id FROM Companies WHERE name = ?), ?, ?, ?, ?)'
    try {
        db.query(query, [name, guide, domain, rate, interpretation], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

export const insertOCQ = ([name, depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year], callback) => {
    try {
        if (depname != '') {
            const query = 'INSERT INTO OCQresults (id_company, depName, A, B, C, D, E, F, G, H, I, J, K, L, M, N, year) VALUES ((SELECT id FROM Companies WHERE name = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            db.query(query, [name, depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year], (err, results) => {
                if (err) throw err
                return callback(null, results)
            })
        }
        if (id_employee != '') {
            const query = 'INSERT INTO OCQresults (id_company, id_employee, A, B, C, D, E, F, G, H, I, J, K, L, M, N, year) VALUES ((SELECT id FROM Companies WHERE name = ?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            db.query(query, [name, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year], (err, results) => {
                if (err) throw err
                return callback(null, results)
            })
        }
    } catch (err) {
        console.log(err)
    }
}

//Ediciones
//Sentencia que actualiza el usuario en la base de datos desde el panel de control
export const editUser = ([id, position, area, isAdmin], callback) => {
    const query = 'UPDATE Users SET position = ?, area = ?, isAdmin = ? WHERE id = ?'
    try {
        db.query(query, [position, area, isAdmin, id], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Sentencia que actualiza el registro de análisis ECAI en la base de datos
export const updateECAI = ([name, eduVal, capVal, adiVal, insVal, advance, waste, year], callback) => {
    const query = 'UPDATE ECAIresults SET educacionValue = ?, capacitacionValue = ?, adiestramientoValue = ?, instruccionValue = ?, advance = ?, waste = ?, year = ? WHERE id = ?'
    try {
        db.query(query, [eduVal, capVal, adiVal, insVal, advance, waste, year, name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateNOM = ([name, guide, domain, rate, interpretation], callback) => {
    const query = 'UPDATE NOMresults SET guide = ?, domain = ?, rate = ?, interpretation = ? WHERE id = ?'
    try {
        db.query(query, [guide, domain, rate, interpretation, name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateOCQ = ([name, depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year], callback) => {
    const query = 'UPDATE OCQresults SET depName = ?, id_employee = ?, A = ?, B = ?, C = ?, D = ?, E = ?, F = ?, G = ?, H = ?, I = ?, J = ?, K = ?, L = ?, M = ?, N = ?, year = ? WHERE id = ?'
    try {
        db.query(query, [depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year, name], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Eliminaciones
//Sentencia que elimina el usuario en la base de datos desde el panel de control
export const deleteUser = ([id], callback) => {
    const query = 'DELETE FROM Users WHERE id = ?'
    try {
        db.query(query, [id], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

//Sentencia que elimina el registro de análisis ECAI en la base de datos
export const deleteECAI = ([id], callback) => {
    const query = 'DELETE FROM ECAIresults WHERE id = ?'
    try {
        db.query(query, [id], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

export const deleteNOM = ([id], callback) => {
    const query = 'DELETE FROM NOMresults WHERE id = ?'
    try {
        db.query(query, [id], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}

export const deleteOCQ = ([id], callback) => {
    const query = 'DELETE FROM OCQresults WHERE id = ?'
    try {
        db.query(query, [id], (err, results) => {
            if (err) throw err
            return callback(null, results)
        })
    } catch (err) {
        console.log(err)
    }
}