import ECAIres from '../Results/ECAIres'
import DespOrg from '../Results/DespOrg'
import DepsKPI from '../Results/DepsKPI'
import Employees from '../Results/Employees'

export default function Results() {

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
                <DepsKPI />
                <br />
                <br />
                <Employees />
            </div>
        </div >
    )
}