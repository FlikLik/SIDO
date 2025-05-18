import { useState } from 'react'
import styles from '../Styles/general.module.css'
import styles2 from '../Styles/register.module.css'
import * as questions from '../Backend/registerQuestions.js'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Register() {

    const [companiesAnswers, setCompaniesAnswers] = useState({})
    const [usersAnswers, setUsersAnswers] = useState({})

    const handleCompaniesQ = (questionId, value) => {
        setCompaniesAnswers({ ...companiesAnswers, [questionId]: value })
    }

    const handleUsersQ = (questionId, value) => {
        setUsersAnswers({ ...usersAnswers, [questionId]: value })
    }

    const generateCode = () => {
        const letters = usersAnswers.fullname.split(' ').map(word => word[0].toUpperCase()).join('')
        const numbers = Math.floor(1000 + Math.random() * 9000)
        return `${letters}${numbers}`
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(Object.keys(companiesAnswers).length)
        console.log(Object.keys(usersAnswers).length)
        const loading = toast.loading('Haciendo el registro...', { className: styles2.toastLoading })
        if (Object.keys(companiesAnswers).length < 4 || Object.keys(usersAnswers).length < 4) {
            toast.update(loading, { render: 'Debes completar los campos de la empresa y del usuario', type: 'error', isLoading: false, autoClose: 3000, className: styles2.toastError })
            return
        }
        axios.post('https://sido-9e7g.onrender.com/submit', { name: companiesAnswers.name, line: companiesAnswers.line, mision: companiesAnswers.mision, vision: companiesAnswers.vision, code: generateCode(), position: usersAnswers.position, area: usersAnswers.area, isAdmin: 1 })
            .then(response => {
                if (response.data.length === 0) {
                    toast.update(loading, { render: 'Error al conectar', type: 'error', isLoading: false, autoClose: 3000, className: styles2.toastError })
                }
                else {
                    toast.update(loading, { render: 'Registro exitoso', type: 'success', isLoading: false, autoClose: 3000, className: styles2.toastLoading })
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 2000)
                }
            })
            .catch(error => {
                toast.update(loading, { render: 'Error al registrar', type: 'error', isLoading: false, autoClose: 3000, className: styles2.toastError })
                console.log('Error al conectar', error)
            })
    }

    return (
        <div className="container has-text-centered mt-6">
            <h1 className={'title is-1 ' + styles.title1}>Formulario de Registro para SIDO</h1>
            <form className={'box field control has-icons-left ' + styles2.form} onSubmit={handleSubmit}>
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
                <button type='submit' className='button is-info mt-3' onClick={handleSubmit}>Registrarse</button>
            </form>
            <pre>{JSON.stringify(companiesAnswers, null, 2)}</pre>
            <pre>{JSON.stringify(usersAnswers, null, 2)}</pre>
        </div>
    )
}