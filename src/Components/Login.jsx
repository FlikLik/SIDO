import styles from '../Styles/login.module.css'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const [code, setCode] = useState("")
    const [showLoader, setShowLoader] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const loading = toast.loading('Buscando usuario...', { className: styles.toastLoading })
        axios.post('http://localhost:3000/login', { code }, { headers: { "Cache-Control": "no-cache" } })
            .then(response => {
                if (response.data.count === 0) {
                    toast.update(loading, { render: 'Usuario no encontrado', type: 'error', isLoading: false, autoClose: 3000, className: styles.toastError })
                }
                if (response.data.count === 1) {
                    toast.update(loading, { render: 'Usuario encontrado', type: 'success', isLoading: false, autoClose: 3000, className: styles.toastLoading })
                    setShowLoader(true)
                    setTimeout(() => {
                        navigate('/home')
                        setShowLoader(false)
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
                    <button type='submit' className='button is-info' onClick={handleSubmit}>Login</button>
                    {
                        showLoader &&
                        (
                            <div className={styles.loadingOverlay}>
                                <img src="loading1.svg" alt="loading" className={styles.loadingsvg} />
                            </div>
                        )
                    }
                </form>
            </section>
            <br />
            <h4 className={'subtitle is-4 has-text-centered has-text-weight-bold ' + styles.subtitle}>
                V. 1.0.5
            </h4>
        </div>
    )
}