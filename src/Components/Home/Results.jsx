import ECAIres from '../Results/ECAIres'
import DespOrg from '../Results/DespOrg'
import DepsKPI from '../Results/DepsKPI'
import Employees from '../Results/Employees'
import { useState } from 'react'

export default function Results() {

    const [year, setYear] = useState('')

    return (
        <div className="container has-text-centered mt-6">
            <h1 className="title is-1">Resultados</h1>
            <h2 className="title is-2">Viendo resultados para la empresa: {localStorage.getItem('company')}</h2>
            <br />
            <div className="fixed-grid has-1-cols-mobile">
                <div className="grid">
                    <div className="cell">
                        <h1 className="title is-1">Gráfico de análisis ECAI</h1>
                        <ECAIres />
                    </div>
                    <div className="cell">
                        <h1 className="title is-1">Desperdicio Organizacional</h1>
                        <DespOrg />
                    </div>
                </div>
                <h1 className="title is-1">Análisis de KPIs</h1>
                <div className='control'>
                    <label className="radio title is-2 mr-4">
                        <input type="radio" name="year" className='mr-2' onChange={() => setYear('2024')} />
                        2024
                    </label>
                    <label className="radio title is-2 mr-4">
                        <input type="radio" name="year" className='mr-2' onChange={() => setYear('2025')} />
                        2025
                    </label>
                </div>
                {
                    year !== '' && (
                        <>
                            <DepsKPI year={year} />
                            <br />
                            <br />
                            <Employees year={year} />
                        </>
                    )
                }

            </div>
        </div >
    )
}