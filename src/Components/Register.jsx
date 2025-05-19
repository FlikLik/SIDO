import { useState, useRef } from 'react'
import styles from '../Styles/general.module.css'
import styles2 from '../Styles/register.module.css'
import * as questions from '../Backend/registerQuestions.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const navigate = useNavigate()
    const [companiesAnswers, setCompaniesAnswers] = useState({})
    const [usersAnswers, setUsersAnswers] = useState({})
    const [idComp, setIdComp] = useState(0)
    const [showCompanyForm, setShowCompanyForm] = useState(true)
    const [showUserForm, setShowUserForm] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const code = useRef(null)

    const handleCompaniesQ = (questionId, value) => {
        setCompaniesAnswers({ ...companiesAnswers, [questionId]: value })
    }

    const handleUsersQ = (questionId, value) => {
        setUsersAnswers({ ...usersAnswers, [questionId]: value })
    }

    const generateCode = () => {
        const letters = usersAnswers.fullname.split(' ').map(word => word[0].toUpperCase()).join('')
        const numbers = Math.floor(1000 + Math.random() * 9000)
        code.current = `${letters}${numbers}`
        return `${letters}${numbers}`
    }

    const handleSubmitUser = (e) => {
        e.preventDefault()
        const loading = toast.loading('Haciendo el registro...', { className: styles2.toastLoading })
        if (Object.keys(usersAnswers).length < 4) {
            toast.update(loading, { render: 'Debes completar los campos de la empresa', type: 'error', isLoading: false, autoClose: 3000, className: styles2.toastError })
            return
        }
        axios.post('https://sido-9e7g.onrender.com/submitUser', { code: generateCode(), id_Company: idComp, position: usersAnswers.position, area: usersAnswers.area, isAdmin: 1 })
            .then(response => {
                if (response.data.affectedRows === 1) {
                    toast.update(loading, { render: 'Usuario registrado', type: 'success', isLoading: false, autoClose: 3000, className: styles2.toastLoading })
                    setShowUserForm(false)
                    setShowCode(true)
                }
            })
            .catch(error => {
                toast.update(loading, { render: 'Error al registrar el usuario', type: 'error', isLoading: false, autoClose: 3000, className: styles2.toastError })
                console.log('Error al registrar el usuario', error)
            })
    }

    const handleSubmitCompany = (e) => {
        e.preventDefault()
        const loading = toast.loading('Haciendo el registro...', { className: styles2.toastLoading })
        if (Object.keys(companiesAnswers).length < 4) {
            toast.update(loading, { render: 'Debes completar los campos de la empresa', type: 'error', isLoading: false, autoClose: 3000, className: styles2.toastError })
            return
        }
        axios.post('https://sido-9e7g.onrender.com/submitCompany', { name: companiesAnswers.name, line: companiesAnswers.line, mision: companiesAnswers.mision, vision: companiesAnswers.vision })
            .then(response => {
                if (response.data.affectedRows === 1) {
                    toast.update(loading, { render: 'Empresa registrada', type: 'success', isLoading: false, autoClose: 3000, className: styles2.toastLoading })
                    setIdComp(response.data.insertId)
                    setShowUserForm(true)
                    setShowCompanyForm(false)
                }
            })
            .catch(error => {
                toast.update(loading, { render: 'Error al registrar la comañia', type: 'error', isLoading: false, autoClose: 3000, className: styles2.toastError })
                console.log('Error al conectar', error)
            })
    }

    return (
        <div className="container has-text-centered mt-6">
            <h1 className={'title is-1 ' + styles.title1}>Formulario de Registro para SIDO</h1>
            <button className='button is-info mt-3' onClick={() => navigate('/')}>Regresar</button>
            <br />
            <br />
            {
                showCompanyForm && (
                    <form className={'box field control has-icons-left ' + styles2.form}>
                        <h2 className={'subtitle is-3 ' + styles.title2}>Datos de la empresa</h2>
                        {
                            questions.CompaniesQ.map((question) => (
                                <div key={question.id}>
                                    {
                                        question.type === 'text' && (
                                            <>
                                                <label className={"label is-size-4 has-text-left " + styles.text}>{question.label}</label>
                                                <div className='control'>
                                                    <input className='input is-medium' type={question.type} placeholder={question.placeholder} size={question.size} value={companiesAnswers[question.value]} onChange={(e) => handleCompaniesQ(question.id, e.target.value)} required />
                                                    <span className='icon is-medium is-left'>
                                                        <img src={question.icon} alt={question.icon} width={35} height={35} />
                                                    </span>
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                    {
                                        question.type === 'textarea' && (
                                            <>
                                                <label className={"label is-size-4 has-text-left " + styles.text}>{question.label}</label>
                                                <div className='control'>
                                                    <textarea className='textarea is-medium' type={question.type} placeholder={question.placeholder} rows={question.rows} value={companiesAnswers[question.value]} onChange={(e) => handleCompaniesQ(question.id, e.target.value)} required />
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                </div>
                            ))
                        }
                        <button type='submit' className='button is-info mt-3' onClick={handleSubmitCompany}>Registrar empresa</button>
                    </form>
                )
            }
            {
                showUserForm && (
                    <form className={'box field control has-icons-left ' + styles2.form}>
                        <h2 className={'subtitle is-3 ' + styles.title2}>Datos del usuario</h2>
                        {
                            questions.UsersQ.map((question) => (
                                <div key={question.id}>
                                    {
                                        question.type === 'text' && (
                                            <>
                                                <label className={"label is-size-4 has-text-left " + styles.text}>{question.label}</label>
                                                <div className='control'>
                                                    <input className='input is-medium' type={question.type} placeholder={question.placeholder} size={question.size} value={usersAnswers[question.value]} onChange={(e) => handleUsersQ(question.id, e.target.value)} required />
                                                    <span className='icon is-medium is-left'>
                                                        <img src={question.icon} alt={question.icon} width={35} height={35} />
                                                    </span>
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                </div>
                            ))
                        }
                        <button type='submit' className='button is-info mt-3' onClick={handleSubmitUser}>Registrarse</button>
                    </form>
                )
            }
            {
                showCode && (
                    <div className={'title is3 ' + styles.title2}>
                        <h1 className={'title is-3 ' + styles.title1}>Código de acceso</h1>
                        <p className={'is-size-5 has-text-centered has-text-black ' + styles2.text}>{code.current}</p>
                    </div>
                )
            }
        </div>
    )
}