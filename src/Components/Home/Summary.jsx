import styles from '../../Styles/general.module.css'
import Depssummary from '../Summary/Depssummary'
import Employeessummary from '../Summary/Employeessummary'

export default function Summary() {
    return (
        <div className="container has-text-centered mt-6">
            <h1 className={'title is-1 ' + styles.title1}>Resumen</h1>
            <h1 className={'title is-3 ' + styles.subtitle}>Comparación de resultados de la empresa: {localStorage.getItem('company')}</h1>
            <h1 className={'title is-3 ' + styles.subtitle}>Años: 2024 ➡️ 2025</h1>
            <Depssummary />
            <br />
            <Employeessummary />
        </div>
    )
}