import { useNavigate } from 'react-router-dom'
import styles from '../../Styles/header.module.css'

export default function Header({ activeTab, setActiveTab }) {

    const navigate = useNavigate()
    const tabs = ['Overview', 'Concepts', 'Results', 'Summary']

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('isAuth')
        navigate('/', { replace: true })
    }

    return (
        <section className={"hero is-small is-primary " + styles.heroStyle}>
            <div className="hero-head has-text-centered p-5">
                <p className="title is-1">SIDO</p>
                <p className="subtitle is-3">Sistema Integral de Diagnóstico Organizacional</p>
            </div>

            <div className='hero-foot'>
                <nav className='tabs is-boxed is-fullwidth'>
                    <div className="container">
                        <ul>
                            {
                                tabs.map((tab, index) => {
                                    return (
                                        <li key={index} className={activeTab === tab ? 'is-active has-text-weight-bold' : ""}><a onClick={() => setActiveTab(tab)}>{tab}</a></li>
                                    )
                                })
                            }
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
    )
}