import styles from '../Styles/login.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const isAuth = localStorage.getItem('isAuth') === 'true'
    const [code, setCode] = useState("")
    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        if (isAuth) navigate('/home', { replace: true })
    }, [isAuth, navigate])

    const searchCompany = (code) => {
        axios.post('https://sido-9e7g.onrender.com/company', { code })
            .then(response => {
                localStorage.setItem('company', response.data.name)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const isAdmin = (code) => {
        axios.post('https://sido-9e7g.onrender.com/isAdmin', { code })
            .then(response => {
                localStorage.setItem('isAdmin', response.data.isAdmin)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const loading = toast.loading('Buscando usuario...', { className: styles.toastLoading })
        axios.post('https://sido-9e7g.onrender.com/login', { code })
            .then(response => {
                if (response.data.count === 0) {
                    toast.update(loading, { render: 'Usuario no encontrado', type: 'error', isLoading: false, autoClose: 3000, className: styles.toastError })
                }
                if (response.data.count === 1) {
                    isAdmin(code)
                    toast.update(loading, { render: 'Usuario encontrado', type: 'success', isLoading: false, autoClose: 3000, className: styles.toastLoading })
                    setShowLoader(true)
                    setTimeout(() => {
                        setShowLoader(false)
                        localStorage.setItem('isAuth', 'true')
                        searchCompany(code)
                        navigate('/home', { replace: true })
                    }, 2000)
                }
            })
            .catch(error => {
                toast.update(loading, { render: 'Error al conectar', type: 'error', isLoading: false, autoClose: 3000, className: styles.toastError })
                console.log('Error al conectar', error)
            })
    }


    return (
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-align-content-center is-flex-wrap-wrap">
            <div className={'title is-1 m-6 has-text-centered ' + styles.title}>
                Sistema Integral de Diagnóstico Organizacional
            </div>
            <section className={'section has-background-primary-85 ' + styles.section}>
                <h2 className={'subtitle is-2 has-text-centered has-text-weight-bold ' + styles.subtitle}>
                    Login
                </h2>
                <figure className={'image is-96x96 ' + styles.image}>
                    <img src='user.png' alt='user.png' />
                </figure>
                <br />
                <form className='field control has-icons-left is-flex is-flex-direction-column is-align-items-center is-justify-content-center'>
                    <input className={'input is-rounded is-medium ' + styles.input} type="text" placeholder="User Code" value={code} onChange={(e) => setCode(e.target.value)} />
                    <span className='icon is-medium is-left'>
                        <img src="key.svg" alt="key" width={35} height={35} />
                    </span>
                    <br />
                    <button type='submit' className='button is-info mt-3' onClick={handleSubmit}>Login</button>
                    {
                        showLoader &&
                        (
                            <div className={styles.loadingOverlay}>
                                <img src="loading1.svg" alt="loading" className={styles.loadingsvg} />
                            </div>
                        )
                    }
                </form>
                <br />
                <h3 className='subtitle is-6 has-text-centered has-text-weight-bold is-italic has-text-link' onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}> ¿No tienes usuario? Regístrate aquí</h3>
            </section>
            <br />
            <h4 className={'subtitle is-4 has-text-centered has-text-weight-bold ' + styles.subtitle}>
                V. 1.0.5
            </h4>
        </div>
    )
}