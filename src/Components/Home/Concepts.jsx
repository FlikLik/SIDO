import { useState } from 'react'
import styles from '../../Styles/concepts.module.css'
import { ecaiConcepts, desperdicioConcepts } from '../../Backend/HomeInfo/concepts.js'


export default function Concepts() {

    const [concepts, setConcepts] = useState([])
    const [despConcept, setDespConcept] = useState([])
    const [isActive, setIsActive] = useState(false)

    const handleConcepts = (concept) => {
        if (concept.content) {
            setConcepts({ title: concept.title, content: concept.content, list: concept.list })
        }
        else {
            setConcepts({ title: concept.title, list: concept.list })
        }
    }

    const handleDespConcepts = (concept) => {
        setDespConcept({ title: concept.title, content: concept.content })
        setIsActive(true)
    }

    return (
        <div className="container has-text-centered mt-6">
            <h1 className="title is-1">Definiciones</h1>

            <div className="columns has-text-black mt-3">
                <div className="column is-one-quarter">
                    <h1 className="title is-3">Análisis ECAI</h1>
                    {
                        ecaiConcepts.map((concept) => (
                            <button className={'mb-5 ' + styles.button} key={concept.id} onClick={() => handleConcepts(concept)}>
                                {concept.title}
                            </button>
                        ))
                    }
                </div>
                <div className="column has-text-black pl-6 pr-6">
                    <h1 className='title is-3'>Concepto</h1>
                    <h1 className='title is-3'>{concepts.title}</h1>
                    <div className={styles.conceptContainer}>
                        {
                            concepts.content &&
                            <p className='is-size-5 has-text-justified'>{concepts.content}</p>

                        }
                        {
                            (!concepts.content && !concepts.list) &&
                            <div className={'has-text-centered is-size-2 ' + styles.phantomDiv}>
                                <figure>
                                    <img src="404notfound.svg" alt="404 not found" width={200} height={200} />
                                </figure>
                                <p>Sin nada que mostrar</p>
                            </div>
                        }
                        <br />
                        <ul className={'has-text-justified ' + styles.list}>
                            {
                                concepts.list &&
                                concepts.list.map((item, index) => (
                                    <li key={index} className='is-size-5 ml-5'>{item}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <br />
            </div>
            <br />
            <br />
            <h1 className='title is-3'>Desperdicio Organizacional</h1>
            <div className='fixed-grid is-gap-2 has-5-columns has-1-cols-mobile'>
                <div className='grid'>
                    {
                        desperdicioConcepts.map((concept) => (
                            <button className={'mb-5 p-4 modal-button ' + styles.textwrap + ' ' + styles.button} key={concept.id} onClick={() => handleDespConcepts(concept)}>
                                {concept.title}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div id='modal' className={`modal ${isActive ? 'is-active is-clipped' : ''}`}>
                <div className='modal-background' onClick={() => setIsActive(false)}></div>
                <div className='modal-content'>
                    {despConcept.title && <h1 className='title is-3'>{despConcept.title}</h1>}
                    <ul className={'box has-text-justified ' + styles.list}>
                        {
                            despConcept.content &&
                            despConcept.content.map((item, index) => (
                                <li key={index} className='is-size-5 ml-5'>{item}</li>
                            ))
                        }
                    </ul>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setIsActive(false)}></button>
            </div>
        </div>
    )
}