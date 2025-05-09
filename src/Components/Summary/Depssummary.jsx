import styles from '../../Styles/general.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import styles2 from '../../Styles/Depssummary.module.css'
import { KPIS } from '../Results/KPIS.js'

export default function Depssummary() {

    const [deps, setDeps] = useState([])
    const [selectedDep, setSelectedDep] = useState('')
    const [kpis1, setKPIs1] = useState([])
    const [kpis2, setKPIs2] = useState([])

    useEffect(() => {
        const name = localStorage.getItem('company')
        axios.post('https://sido-9e7g.onrender.com/departments', { name })
            .then(response => {
                setDeps(response.data)
            })
            .catch(error => {
                toast.error('Error al obtener la lista de deps: Summary Failure')
                console.log(error)
            })
    }, [])

    const handleClick = (dep) => {
        let formattedData = []
        setSelectedDep(dep)
        axios.post('https://sido-9e7g.onrender.com/kpis', { name: dep, year: 2024 })
            .then(response => {
                //eslint-disable-next-line no-unused-vars
                Object.entries(response.data[0]).forEach(([key, value], index) => {
                    formattedData.push({ value })
                })
                setKPIs1(formattedData)
            })
            .catch(error => {
                toast.error('Error al obtener los KPIs del año 2024: Summary Failure')
                console.log(error)
            })
        let formattedData2 = []
        axios.post('https://sido-9e7g.onrender.com/kpis', { name: dep, year: 2025 })
            .then(response => {
                //eslint-disable-next-line no-unused-vars
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
            <h1 className={'title is-2 ' + styles.subtitle}>Departamentos</h1>
            <div className='fixed-grid has-4-cols has-2-cols-mobile'>
                <div className='grid'>
                    {
                        deps.length > 0 ?
                            deps.map((dep, index) => (
                                <div className='cell' key={index}>
                                    <button className={'button ' + styles2.button} onClick={() => handleClick(dep.area)}>{dep.area}</button>
                                </div>
                            )) : <div className='has-text-centered is-size-2 has-text-black' style={{ opacity: 0.5 }}>
                                <figure>
                                    <img src="404notfound.svg" alt="404 not found" width={200} height={200} />
                                </figure>
                                <p>Cargando...</p>
                            </div>
                    }
                </div>
                <br />
                {
                    selectedDep !== '' && (
                        <>
                            <h1 className={'title is-3 ' + styles.subtitle}>Viendo resumen del dep: {selectedDep}</h1>
                        </>
                    )
                }
                <div className='grid'>
                    {
                        (kpis1.length > 0 && kpis2.length > 0) && (KPIS.map((kpi, index) => (
                            <div className={'cell ' + styles.box} key={index}>
                                <h1 className={'title is-4 ' + styles.subtitle}>{kpi}</h1>
                                <p className='subtitle is-4 has-text-black'>{kpis1[index].value} ➡️ {kpis2[index].value}</p>
                                {kpis2[index].value > kpis1[index].value ? (<span className='title is-2'>📈</span>) : (kpis2[index].value < kpis1[index].value ? (<span className='title is-2'>📉</span>) : <span className='title is-2'>🟰</span>)}
                            </div>
                        ))
                        )
                    }
                </div>
            </div>
            <br />
        </div>
    )
}