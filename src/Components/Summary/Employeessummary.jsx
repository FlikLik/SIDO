import styles from '../../Styles/general.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { KPIS } from '../Results/KPIS.js'

export default function Employeessummary() {

    const [employees, setEmployees] = useState([])
    const [kpis1, setKPIs1] = useState([])
    const [kpis2, setKPIs2] = useState([])
    const [avatarUrl, setAvatarUrl] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const seeds = ['Easton', 'Ryan', 'Jessica', 'Nolan', 'Christian', 'Valentina', 'Oliver', 'Mason', 'Eden', 'Wyatt', 'Kingston', 'Luis', 'Caleb', 'Emery']

    useEffect(() => {
        const name = localStorage.getItem('company')
        axios.post('http://localhost:3000/employeesComparasion', { name })
            .then(response => {
                setEmployees(response.data)
            })
            .catch(error => {
                toast.error('Error al obtener la lista de empleados: Summary Failure')
                console.log(error)
            })
    }, [])

    const handleEmployeeData = (selectedEmployee) => {
        axios.post('http://localhost:3000/employeesData', { code: selectedEmployee })
            .then(response => {
                setEmployeeData(response.data)
            })
            .catch(error => {
                toast.error('Error, respuesta sin datos')
                console.log(error)
            })
    }

    const handleChange = (e) => {
        let formattedData = []
        const seed = seeds[Math.floor(Math.random() * seeds.length)]
        const avatarUrl = `https://api.dicebear.com/5.x/pixel-art/svg?seed=${seed}`
        axios.post('http://localhost:3000/kpis', { name: e.target.value, year: 2024 })
            .then(response => {
                // eslint-disable-next-line no-unused-vars
                Object.entries(response.data[0]).forEach(([key, value], index) => {
                    formattedData.push({ value })
                })
                setKPIs1(formattedData)
                setAvatarUrl(avatarUrl)
                handleEmployeeData(e.target.value)
            })
            .catch(error => {
                toast.error('Error al obtener los KPIs del año 2024: Summary Failure')
                console.log(error)
            })
        let formattedData2 = []
        axios.post('http://localhost:3000/kpis', { name: e.target.value, year: 2025 })
            .then(response => {
                // eslint-disable-next-line no-unused-vars
                Object.entries(response.data[0]).forEach(([key, value], index) => {
                    formattedData2.push({ value })
                })
                setKPIs2(formattedData2)
            })
            .catch(error => {
                toast.error('Error al obtener los KPIs del año 2025: Summary Failure')
                console.log(error)
            })
    }

    return (
        <div>
            <h1 className={'title is-2 ' + styles.subtitle}>Empleados</h1>
            <div className='select is-primary is-rounded'>
                <select name="employees" id="employees" onChange={handleChange}>
                    <option value="0">Seleccione un empleado</option>
                    {
                        employees.length > 0 ?
                            employees.map((employee, index) => (
                                <option key={index} value={employee.code}>{employee.code}</option>
                            )) :
                            <option value="0">Cargando...</option>
                    }
                </select>
            </div>
            <br />
            {
                (avatarUrl.length > 0 && employeeData.length > 0) && (
                    <>
                        <div className={styles.text}>
                            <img src={avatarUrl} alt="avatar" width={150} className='mt-5' />
                            <br />
                            <p className='subtitle is-4 has-text-black'><strong>Posición:</strong> {employeeData[0].position}</p>
                            <p className='subtitle is-4 has-text-black'><strong>Departamento:</strong> {employeeData[0].area}</p>
                        </div>
                        <br />
                        <div className='fixed-grid has-4-cols has-2-cols-mobile'>
                            <div className='grid'>
                                {
                                    KPIS.map((kpi, index) => (
                                        <div className={'cell ' + styles.box} key={index}>
                                            <h1 className={'title is-4 ' + styles.subtitle}>{kpi}</h1>
                                            <p className='subtitle is-4 has-text-black'>{kpis1[index].value} ➡️ {kpis2[index].value}</p>
                                            {kpis2[index].value > kpis1[index].value ? (<span className='title is-2'>📈</span>) : (kpis2[index].value < kpis1[index].value ? (<span className='title is-2'>📉</span>) : <span className='title is-2'>🟰</span>)}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}