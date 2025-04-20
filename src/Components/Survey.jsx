import styles from '../Styles/survey.module.css'
import { questions } from '../Backend/questions.js'
import { useState } from 'react'

export default function Survey() {

    const [answers, setAnswers] = useState({})

    const handleChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value })
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
                                                    <input className='input is-medium' type={question.type} placeholder={question.placeholder} size={question.size} value={answers[question.id]} onChange={(e) => handleChange(question.id, e.target.value)} />
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