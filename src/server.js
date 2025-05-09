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

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})