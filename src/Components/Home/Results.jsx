import ECAIres from '../Results/ECAIres'
import DespOrg from '../Results/DespOrg'
import DepsKPI from '../Results/DepsKPI'
import NOMres from '../Results/NOMres'
import Employees from '../Results/Employees'
import { useState } from 'react'
import styles from '../../Styles/general.module.css'

export default function Results() {

    const [year, setYear] = useState('')

    return (
        <div className="container has-text-centered mt-6">
            <h1 className={"title is-1 " + styles.title1}>Resultados</h1>
            <h2 className={"title is-3 " + styles.subtitle}>Viendo resultados para la empresa: {localStorage.getItem('company')}</h2>
            <br />
            <div className="fixed-grid has-1-cols-mobile">
                <div className="grid">
                    <div className="cell">
                        <h1 className={"title is-2 " + styles.subtitle}>Gráfico de análisis ECAI</h1>
                        <ECAIres />
                    </div>
                    <div className="cell">
                        <h1 className={"title is-2 " + styles.subtitle}>Desperdicio Organizacional</h1>
                        <DespOrg />
                    </div>
                </div>
                <h1 className={'title is-2 ' + styles.title2}>Resultados de la NOM-035</h1>
                <NOMres />
                <h1 className={"title is-2 " + styles.title2}>Análisis de KPIs</h1>
                <div className='control'>
                    <label className="radio title is-3 mr-4">
                        <input type="radio" name="year" className='mr-2' onChange={() => setYear('2024')} />
                        2024
                    </label>
                    <label className="radio title is-3 mr-4">
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