import styles from '../Styles/general.module.css'
import UsersControl from './ControlPanel/UsersControl'
import ECAIcontrol from './ControlPanel/ECAIcontrol'

export default function ControlPanel() {
    return (
        <div className="container has-text-centered mt-6">
            <h1 className={'title is-1 ' + styles.title1}>Panel de Control de Datos</h1>
            <h2 className={'title is-3 ' + styles.title2}>Sección de usuarios</h2>
            <UsersControl />
            <h2 className={'title is-3 ' + styles.title2}>Sección de análisis ECAI</h2>
            <ECAIcontrol />
        </div>
    )
}