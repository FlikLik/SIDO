import { useState, useEffect } from 'react'
import axios from 'axios'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { KPIS } from './KPIS.js'
import { toast } from 'react-toastify'

export default function Employees({ year }) {

    const [employees, setEmployees] = useState([])
    const [chartData, setChartData] = useState([])
    const [avatarUrl, setAvatarUrl] = useState('')
    const [employeeData, setEmployeeData] = useState([])
    const seeds = ['Easton', 'Ryan', 'Jessica', 'Nolan', 'Christian', 'Valentina', 'Oliver', 'Mason', 'Eden', 'Wyatt', 'Kingston', 'Luis', 'Caleb', 'Emery']

    useEffect(() => {
        const name = localStorage.getItem('company')
        axios.post('http://localhost:3000/employees', { name })
            .then(response => {
                setEmployees(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: Employees Failure')
                console.log(error)
            })
    }, [])

    const handleEmployeeData = (selectedEmployee) => {
        axios.post('http://localhost:3000/employeesData', { code: selectedEmployee })
            .then(response => {
                console.log(response.data)
                setEmployeeData(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: Employees Failure')
                console.log(error)
            })
    }

    const handleChange = (e) => {
        let formattedData = []
        const seed = seeds[Math.floor(Math.random() * seeds.length)]
        const avatarUrl = `https://api.dicebear.com/5.x/pixel-art/svg?seed=${seed}`
        axios.post('http://localhost:3000/kpis', { name: e.target.value, year: year })
            .then(response => {
                // eslint-disable-next-line no-unused-vars
                Object.entries(response.data[0]).forEach(([key, value], index) => {
                    formattedData.push({ name: KPIS[index], value: value })
                }
                )
                setChartData(formattedData)
                setAvatarUrl(avatarUrl)
                handleEmployeeData(e.target.value)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: Employees Failure')
                console.log(error)
            })
    }

    return (
        <div className='columns'>
            <div className='column is-one-quarter'>
                <h1 className='title is-3'>Empleados</h1>
                <div className="select is-primary is-rounded">
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
                        <div>
                            <img src={avatarUrl} alt="avatar" width={150} className='mt-5' />
                            <br />
                            <p className='subtitle is-4 has-text-black'><strong>Posición:</strong> {employeeData[0].position}</p>
                            <p className='subtitle is-4 has-text-black'><strong>Departamento:</strong> {employeeData[0].area}</p>
                        </div>
                    )
                }
            </div>

            <div className='column'>
                <h1 className='title is-3'>Gráfico Radar de KPIs</h1>
                {
                    chartData.length > 0 ? (
                        <ResponsiveContainer width='100%' height={400}>
                            <RadarChart cx="50%" cy="50%" outerRadius={150} width={600} height={600} data={chartData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="name" />
                                <PolarRadiusAxis domain={[0, 5]} />
                                <Tooltip />
                                <Radar name="Evaluacion" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    ) : <div className='has-text-centered is-size-2 has-text-black' style={{ opacity: 0.5 }}>
                        <figure>
                            <img src="404notfound.svg" alt="404 not found" width={200} height={200} />
                        </figure>
                        <p>Cargando...</p>
                    </div>
                }
            </div>
        </div>
    )
}