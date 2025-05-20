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
    queries.getAllUsers([code], (err, results) => {
        if (err) throw err
        res.send({ count: results[0].count })
    })
})

app.post('/isAdmin', (req, res) => {
    const { code } = req.body
    queries.getIsAdmin([code], (err, results) => {
        if (err) throw err
        res.send({ isAdmin: results[0].isAdmin })
    })
})


//Endpoint que recibe el code del usuario y devuelve el nombre de la empresa que tiene el mismo code
//Se utiliza para buscar el nombre de la empresa en la base de datos
app.post('/company', (req, res) => {
    const { code } = req.body
    queries.getCompany([code], (err, results) => {
        if (err) throw err
        res.send({ name: results[0].name })
    })
})

//Endpoint que devuelve los datos de la tabla Companies
app.get('/companies', (req, res) => {
    queries.getAllCompanies((err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/ecairesults', (req, res) => {
    const { name, year } = req.body
    queries.getCompanyResults([name, year], (err, results) => {
        if (err) throw err
        res.send({ eValue: results[0].educacionValue, cValue: results[0].capacitacionValue, aValue: results[0].adiestramientoValue, iValue: results[0].instruccionValue })
    })
})

app.post('/nomresults', (req, res) => {
    const { name, guide } = req.body
    queries.getNOMRes([name, guide], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/desperdicio', (req, res) => {
    const { name, year } = req.body
    queries.getCompanyDesp([name, year], (err, results) => {
        if (err) throw err
        res.send({ advance: results[0].advance, waste: results[0].waste })
    })
})

app.post('/departments', (req, res) => {
    const { name } = req.body
    queries.getDeps([name], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/kpis', (req, res) => {
    const { name, year } = req.body
    queries.getKPIS([name, year], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/employees', (req, res) => {
    const { name } = req.body
    queries.getEmployees([name], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/employeesData', (req, res) => {
    const { code } = req.body
    queries.getEmployeesData([code], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/employeesComparasion', (req, res) => {
    const { name } = req.body
    queries.getEmployeesBothYears([name], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/submitCompany', (req, res) => {
    const { name, line, mision, vision } = req.body
    queries.insertCompany([name, line, mision, vision], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/submitUser', (req, res) => {
    const { code, id_Company, position, area, isAdmin } = req.body
    queries.insertUser([code, id_Company, position, area, isAdmin], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})


//Gets generales
app.post('/getUsers', (req, res) => {
    const { name } = req.body
    queries.getUsers([name], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})


app.post('/getECAI', (req, res) => {
    const { name } = req.body
    queries.getECAI([name], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/getNOM', (req, res) => {
    const { name } = req.body
    queries.getNOM([name], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

//Inserciones generales
app.post('/addECAI', (req, res) => {
    const { name, eduVal, capVal, adiVal, insVal, advance, waste, year } = req.body
    queries.insertECAI([name, eduVal, capVal, adiVal, insVal, advance, waste, year], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/addUser', (req, res) => {
    const { code, name, position, area, isAdmin } = req.body
    queries.addUser([code, name, position, area, isAdmin], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/addNOM', (req, res) => {
    const { name, guide, domain, rate, interpretation } = req.body
    queries.insertNOM([name, guide, domain, rate, interpretation], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

//Edits generales
app.post('/editUser', (req, res) => {
    const { id, position, area, isAdmin } = req.body
    queries.editUser([id, position, area, isAdmin], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})


app.post('/editECAI', (req, res) => {
    const { id, eduVal, capVal, adiVal, insVal, advance, waste, year } = req.body
    queries.updateECAI([id, eduVal, capVal, adiVal, insVal, advance, waste, year], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/editNOM', (req, res) => {
    const { id, guide, domain, rate, interpretation } = req.body
    queries.updateNOM([id, guide, domain, rate, interpretation], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

//Eliminaciones generales
app.post('/deleteUser', (req, res) => {
    const { id } = req.body
    queries.deleteUser([id], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/deleteECAI', (req, res) => {
    const { id } = req.body
    queries.deleteECAI([id], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.post('/deleteNOM', (req, res) => {
    const { id } = req.body
    queries.deleteNOM([id], (err, results) => {
        if (err) throw err
        res.send(results)
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})