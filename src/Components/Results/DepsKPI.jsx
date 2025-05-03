import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../Styles/depskpi.module.css'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts'
import { KPIS } from './KPIS.js'

export default function DepsKPI() {

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
                console.log(error)
            })
    }, [])

    const handleDepResult = (dep) => {
        let formattedData = []
        axios.post('http://localhost:3000/kpis', { name: dep, year: '2024' })
            .then(response => {
                // eslint-disable-next-line no-unused-vars
                Object.entries(response.data[0]).forEach(([key, value], index) => {
                    formattedData.push({ name: KPIS[index], value: value })
                }
                )
                setDeptsKpis(formattedData)
            })
            .catch(error => {
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
                        )) : <h1 className='title is-3'>Cargando...</h1>
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
                                <YAxis />
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
                    ) : <p className='title is-4'>Nada que mostrar</p>
                }
            </div>
        </div>
    )
}