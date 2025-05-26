import * as queries from './Backend/queries.js'

import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Endpoint que recibe el code del usuario y devuelve el numero de usuarios que tienen el mismo code
//Se utiliza para verificar si el usuario existe
app.post('/login', (req, res) => {
    const { code } = req.body
    try {
        queries.getAllUsers([code], (err, results) => {
            if (err) throw err
            res.send({ count: results[0].count })
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/isAdmin', (req, res) => {
    const { code } = req.body
    try {
        queries.getIsAdmin([code], (err, results) => {
            if (err) throw err
            res.send({ isAdmin: results[0].isAdmin })
        })
    } catch (err) {
        console.log(err)
    }
})


//Endpoint que recibe el code del usuario y devuelve el nombre de la empresa que tiene el mismo code
//Se utiliza para buscar el nombre de la empresa en la base de datos
app.post('/company', (req, res) => {
    const { code } = req.body
    try {
        queries.getCompany([code], (err, results) => {
            if (err) throw err
            res.send({ name: results[0].name })
        })
    } catch (err) {
        console.log(err)
    }
})

//Endpoint que devuelve los datos de la tabla Companies
app.get('/companies', (req, res) => {
    try {
        queries.getAllCompanies((err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/ecairesults', (req, res) => {
    const { name, year } = req.body
    try {
        queries.getCompanyResults([name, year], (err, results) => {
            if (err) throw err
            res.send({ eValue: results[0].educacionValue, cValue: results[0].capacitacionValue, aValue: results[0].adiestramientoValue, iValue: results[0].instruccionValue })
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/nomresults', (req, res) => {
    const { name, guide } = req.body
    try {
        queries.getNOMRes([name, guide], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/desperdicio', (req, res) => {
    const { name, year } = req.body
    try {
        queries.getCompanyDesp([name, year], (err, results) => {
            if (err) throw err
            res.send({ advance: results[0].advance, waste: results[0].waste })
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/departments', (req, res) => {
    const { name } = req.body
    try {
        queries.getDeps([name], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/kpis', (req, res) => {
    const { name, year } = req.body
    try {
        queries.getKPIS([name, year], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/employees', (req, res) => {
    const { name } = req.body
    try {
        queries.getEmployees([name], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/employeesData', (req, res) => {
    const { code } = req.body
    try {
        queries.getEmployeesData([code], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/employeesComparasion', (req, res) => {
    const { name } = req.body
    try {
        queries.getEmployeesBothYears([name], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/submitCompany', (req, res) => {
    const { name, line, mision, vision } = req.body
    try {
        queries.insertCompany([name, line, mision, vision], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/submitUser', (req, res) => {
    const { code, id_Company, position, area, isAdmin } = req.body
    try {
        queries.insertUser([code, id_Company, position, area, isAdmin], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})


//Gets generales
app.post('/getUsers', (req, res) => {
    const { name } = req.body
    try {
        queries.getUsers([name], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})


app.post('/getECAI', (req, res) => {
    const { name } = req.body
    try {
        queries.getECAI([name], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/getNOM', (req, res) => {
    const { name } = req.body
    try {
        queries.getNOM([name], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/getOCQ', (req, res) => {
    const { name } = req.body
    try {
        queries.getOCQ([name], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

//Inserciones generales
app.post('/addECAI', (req, res) => {
    const { name, eduVal, capVal, adiVal, insVal, advance, waste, year } = req.body
    try {
        queries.insertECAI([name, eduVal, capVal, adiVal, insVal, advance, waste, year], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/addUser', (req, res) => {
    const { code, name, position, area, isAdmin } = req.body
    try {
        queries.addUser([code, name, position, area, isAdmin], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/addNOM', (req, res) => {
    const { name, guide, domain, rate, interpretation } = req.body
    try {
        queries.insertNOM([name, guide, domain, rate, interpretation], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/addOCQ', (req, res) => {
    const { name, depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year } = req.body
    try {
        queries.insertOCQ([name, depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

//Edits generales
app.post('/editUser', (req, res) => {
    const { id, position, area, isAdmin } = req.body
    try {
        queries.editUser([id, position, area, isAdmin], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})


app.post('/editECAI', (req, res) => {
    const { id, eduVal, capVal, adiVal, insVal, advance, waste, year } = req.body
    try {
        queries.updateECAI([id, eduVal, capVal, adiVal, insVal, advance, waste, year], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/editNOM', (req, res) => {
    const { id, guide, domain, rate, interpretation } = req.body
    try {
        queries.updateNOM([id, guide, domain, rate, interpretation], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/editOCQ', (req, res) => {
    const { id, depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year } = req.body
    try {
        queries.updateOCQ([id, depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

//Eliminaciones generales
app.post('/deleteUser', (req, res) => {
    const { id } = req.body
    try {
        queries.deleteUser([id], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/deleteECAI', (req, res) => {
    const { id } = req.body
    try {
        queries.deleteECAI([id], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/deleteNOM', (req, res) => {
    const { id } = req.body
    try {
        queries.deleteNOM([id], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.post('/deleteOCQ', (req, res) => {
    const { id } = req.body
    try {
        queries.deleteOCQ([id], (err, results) => {
            if (err) throw err
            res.send(results)
        })
    } catch (err) {
        console.log(err)
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})