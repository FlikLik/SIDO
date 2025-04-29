import { useState } from 'react'
import styles from '../../Styles/concepts.module.css'
import { ecaiConcepts } from '../../Backend/HomeInfo/concepts.js'


export default function Concepts() {

    const [concepts, setConcepts] = useState([])

    const handleConcepts = (concept) => {
        if (concept.content) {
            setConcepts({ title: concept.title, content: concept.content, list: concept.list })
        }
        else {
            setConcepts({ title: concept.title, list: concept.list })
        }
    }

    return (
        <div className="container has-text-centered mt-6">
            <h1 className="title is-1">Definiciones</h1>

            <div className="columns has-text-black mt-3">
                <div className="column is-one-quarter">
                    <h1 className="title is-2">Análisis ECAI</h1>
                    {
                        ecaiConcepts.map((concept) => (
                            <button className={'mb-5 ' + styles.button} key={concept.id} onClick={() => handleConcepts(concept)}>
                                {concept.title}
                            </button>
                        ))
                    }
                </div>
                <div className="column has-text-black p-6">
                    <h1 className='title is-2'>Concepto</h1>
                    <h1 className='title is-3'>{concepts.title}</h1>
                    <div className={styles.conceptContainer}>
                        {
                            concepts.content &&
                            <p className='is-size-5 has-text-justified'>{concepts.content}</p>

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
            </div>
        </div>
    )
}