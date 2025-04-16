import '../Styles/login.css'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [res, setRes] = useState(0)
    const [showLoader, setShowLoader] = useState(false)
    var loading

    const handleSubmit = (e) => {
        e.preventDefault()
        loading = toast.loading('Buscando usuario...', { className: 'toast-loading' })
        axios.post('http://localhost:3000/login', { code })
            .then((response) => {
                console.log('Datos recibidos', response.data.count)
                setRes(response.data)
                login()
            })
            .catch((error) => {
                toast.update(loading, { render: 'Error al conectar', type: 'error', isLoading: false, autoClose: 3000, className: 'toast-error' })
                console.log('Error al conectar', error)
            })
    }

    const login = () => {
        if (res === 0) {
            toast.update(loading, { render: 'Usuario no encontrado', type: 'error', isLoading: false, autoClose: 3000, className: 'toast-error' })
        } else {
            toast.update(loading, { render: 'Usuario encontrado', type: 'success', isLoading: false, autoClose: 3000, className: 'toast-loading' })
            setShowLoader(true)
            setTimeout(() => {
                navigate('/home')
                setShowLoader(false)
            }, 2000)

        }
    }

    return (
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-align-content-center is-flex-wrap-wrap">
            <div className='title is-1 m-6 has-text-centered '>
                Sistema Integral de Diagnóstico Organizacional
            </div>
            <section className='section has-background-primary-85'>
                <h2 className='subtitle is-2 has-text-centered has-text-weight-bold'>
                    Login
                </h2>
                <figure className='image is-96x96'>
                    <img src='user.png' alt='user.png' />
                </figure>
                <br />
                <form className='field control has-icons-left is-flex is-flex-direction-column is-align-items-center is-justify-content-center'>
                    <input className='input is-rounded is-medium' type="text" placeholder="User Code" value={code} onChange={(e) => setCode(e.target.value)} />
                    <span className='icon is-medium is-left'>
                        <img src="key.svg" alt="key" width={35} height={35} />
                    </span>
                    <br />
                    <button type='submit' className='button is-info' onClick={handleSubmit}>Login</button>
                    {
                        showLoader && <img src="loading1.svg" alt="loading" width={10} height={10} className='loading-overlay' />
                    }
                </form>
            </section>
        </div>
    )
}