import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../Styles/depskpi.module.css'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts'
import { KPIS } from './KPIS.js'
import { toast } from 'react-toastify'

export default function DepsKPI({ year }) {

    const [deps, setDeps] = useState([])
    const [deptsKpis, setDeptsKpis] = useState([])
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF5', '#FF8333', '#FFD133', '#33D1FF', '#FF333D', '#33FFA1', '#D133FF', '#8333FF', '#F5FF33']

    useEffect(() => {
        const name = localStorage.getItem('company')
        axios.post('http://localhost:3000/departments', { name })
            .then(response => {
                setDeps(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: Departments Failure')
                console.log(error)
            })
    }, [])

    const handleDepResult = (dep) => {
        let formattedData = []
        axios.post('http://localhost:3000/kpis', { name: dep, year: year })
            .then(response => {
                // eslint-disable-next-line no-unused-vars
                Object.entries(response.data[0]).forEach(([key, value], index) => {
                    formattedData.push({ name: KPIS[index], value: value })
                }
                )
                setDeptsKpis(formattedData)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: Departments Failure')
                console.log(error)
            })
    }

    return (
        <div className='columns'>
            <div className='column is-one-quarter'>
                <h1 className='title is-3'>Departamentos</h1>
                <div className='is-flex is-flex-direction-column'>
                    {
                        deps.length > 0 ? deps.map((dep, index) => (
                            <button className={'button mb-5 ' + styles.button} key={index} onClick={() => handleDepResult(dep.area)}>
                                {dep.area}
                            </button>
                        )) : <div className='has-text-centered is-size-2 has-text-black' style={{ opacity: 0.5 }}>
                            <figure>
                                <img src="404notfound.svg" alt="404 not found" width={200} height={200} />
                            </figure>
                            <p>Cargando...</p>
                        </div>
                    }
                </div>
            </div>

            <div className='column'>
                <h1 className='title is-3'>Gráfico de Barra de KPIs</h1>
                {
                    deptsKpis.length > 0 ? (
                        <ResponsiveContainer width='100%' height={400}>
                            <BarChart data={deptsKpis}>
                                <XAxis dataKey='name' />
                                <YAxis domain={[0, 5]} />
                                <Tooltip />
                                <Legend payload={deptsKpis.map((entry, index) => ({
                                    value: entry.name,
                                    id: index,
                                    color: colors[index % colors.length]
                                }))} />
                                <Bar dataKey='value'>
                                    {
                                        deptsKpis.map((data, index) => (
                                            <Cell fill={colors[index % colors.length]} key={index} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : <div className='has-text-centered is-size-2 has-text-black' style={{ opacity: 0.5 }}>
                        <figure>
                            <img src="404notfound.svg" alt="404 not found" width={200} height={200} />
                        </figure>
                        <p>Cargando...</p>
                    </div>
                }
            </div>
        </div >
    )
}