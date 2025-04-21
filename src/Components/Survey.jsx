import styles from '../Styles/survey.module.css'
import { questions } from '../Backend/questions.js'
import { useState } from 'react'

export default function Survey() {

    const [answers, setAnswers] = useState({})

    const handleChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value })
    }

    const handleCheckbox = (questionId, option) => {
        const currentAnswers = answers[questionId] || []
        const updateAnswers = currentAnswers.includes(option)
            ? currentAnswers.filter((item) => item !== option)
            : [...currentAnswers, option]
        setAnswers({ ...answers, [questionId]: updateAnswers })
    }

    return (
        <div className="is-flex gap-2 is-justify-content-center is-align-items-center is-align-content-center is-flex-wrap-wrap is-flex-direction-column">
            <h1 className={"title is-1 m-6 has-text-centered " + styles.title}>Escuesta del Diagnóstico de Competitividad Organizacional</h1>
            <div className={'box p-5 ' + styles.survey}>
                <form action="">
                    <div className='field control has-icons-left'>
                        {
                            questions.map((question) => (
                                <div key={question.id}>
                                    {
                                        question.type === 'text' && (
                                            <>
                                                <label className="label is-size-4">{question.label}</label>
                                                <div className='control'>
                                                    <input className='input is-medium' type={question.type} placeholder={question.placeholder} size={question.size} value={answers[question.value]} onChange={(e) => handleChange(question.id, e.target.value)} required />
                                                    <span className='icon is-medium is-left'>
                                                        <img src={question.icon} alt={question.icon} width={35} height={35} />
                                                    </span>
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                    {
                                        question.type === 'radio' && (
                                            <>
                                                <label className="label is-size-4">{question.label}</label>
                                                <div className='control grid'>
                                                    {
                                                        question.options.map((option) => (
                                                            <label key={option} className='is-size-5 has-text-weight-bold'>
                                                                <input type={question.type} name={question.id} value={option} checked={answers[question.id] === option} onChange={(e) => handleChange(question.id, e.target.value)} className='mr-1' />
                                                                {option}
                                                            </label>
                                                        ))
                                                    }
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                    {
                                        question.type === 'number' && (
                                            <div className='is-flex is-align-items-center'>
                                                <label className="label is-size-4 is-flex-grow-1">{question.label}</label>
                                                <div className='control'>
                                                    <input className={'input is-medium ' + styles.input} type={question.type} placeholder={question.placeholder} size={question.size} min={question.min} max={question.max} value={answers[question.value]} onChange={(e) => handleChange(question.id, e.target.value)} required />
                                                    <span className='icon is-medium is-left'>
                                                        <img src={question.icon} alt={question.icon} width={35} height={35} />
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        question.type === 'checkbox' && (
                                            <>
                                                <label className="label is-size-4">{question.label}</label>
                                                <div className='checkboxes grid'>
                                                    {
                                                        question.options.map((option) => (
                                                            <label key={option}>
                                                                <input className={styles.input} type={question.type} value={option} checked={(answers[question.id] || []).includes(option)} onChange={() => handleCheckbox(question.id, option)} />
                                                                {option}
                                                            </label>
                                                        ))
                                                    }
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </form>
            </div>
            <br />
            <pre>{JSON.stringify(answers, null, 2)}</pre>
        </div>
    )
}