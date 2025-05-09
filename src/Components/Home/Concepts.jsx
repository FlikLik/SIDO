import { useState } from 'react'
import styles from '../../Styles/concepts.module.css'
import styles2 from '../../Styles/general.module.css'
import { ecaiConcepts, desperdicioConcepts, NOM035, SIDOyNOM035, variablesTable } from '../../Backend/HomeInfo/concepts.js'


export default function Concepts() {

    const [concepts, setConcepts] = useState([])
    const [despConcept, setDespConcept] = useState([])
    const [NOM, setNOM] = useState([])
    const [sidonom, setSidonom] = useState([])
    const [isActive, setIsActive] = useState(false)
    const [isActiveNom, setIsActiveNom] = useState(false)
    const [isActiveSidonom, setIsActiveSidonom] = useState(false)
    const rows = []
    for (let i = 0; i < variablesTable.length; i += 3) {
        rows.push(variablesTable.slice(i, i + 3))
    }

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

    const handleNOM035 = (concept) => {
        if (concept.afterlist) {
            setNOM({ title: concept.title, content: concept.content, list: concept.list, afterlist: concept.afterlist })
        } else {
            if (concept.list) {
                setNOM({ title: concept.title, content: concept.content, list: concept.list })
            } else
                setNOM({ title: concept.title, content: concept.content })
        }
        setIsActiveNom(true)
    }

    const handleSIDOyNOM035 = (concept) => {
        if (concept.afterlist) {
            setSidonom({ title: concept.title, content: concept.content, list: concept.list, afterlist: concept.afterlist })
        } else {
            if (concept.list) {
                setSidonom({ title: concept.title, content: concept.content, list: concept.list })
            } else
                setSidonom({ title: concept.title, content: concept.content })
        }
        setIsActiveSidonom(true)
    }

    return (
        <div className="container has-text-centered mt-6">
            <h1 className={"title " + styles2.title1}>Definiciones</h1>

            <div className="columns has-text-black mt-3">
                <div className="column is-one-quarter">
                    <h1 className={"title is-3 " + styles2.subtitle}>Análisis ECAI</h1>
                    {
                        ecaiConcepts.map((concept) => (
                            <button className={'mb-5 ' + styles.button} key={concept.id} onClick={() => handleConcepts(concept)}>
                                {concept.title}
                            </button>
                        ))
                    }
                </div>
                <div className="column has-text-black pl-6 pr-6">
                    <h1 className={'title is-3 ' + styles2.subtitle}>Concepto</h1>
                    <h1 className={'title is-3 ' + styles2.subtitle}>{concepts.title}</h1>
                    <div className={styles.conceptContainer}>
                        {
                            concepts.content &&
                            <p className={'is-size-5 has-text-justified ' + styles2.text}>{concepts.content}</p>

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
                        <ul className={'has-text-justified ' + styles.list + ' ' + styles2.text}>
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
            <h1 className={'title is-3 ' + styles2.subtitle}>Desperdicio Organizacional</h1>
            <div className='fixed-grid is-gap-2 has-5-columns has-1-cols-mobile'>
                <div className='grid'>
                    {
                        desperdicioConcepts.map((concept) => (
                            <button className={'mb-5 p-4 modal-button ' + styles.textwrap + ' ' + styles.button2} data-target='modal' key={concept.id} onClick={() => handleDespConcepts(concept)}>
                                {concept.title}
                            </button>
                        ))
                    }
                </div>
            </div>
            <br />
            <h1 className={'title is-3 ' + styles2.subtitle}>NOM-035-STPS-2018</h1>
            <div className='fixed-grid is-gap-2 has-5-columns has-1-cols-mobile'>
                <div className='grid'>
                    {
                        NOM035.map((concept) => (
                            <button className={'mb-5 p-4 modal-button ' + styles.textwrap + ' ' + styles.button3} data-target='modalsidonom' key={concept.id} onClick={() => handleNOM035(concept)}>
                                {concept.title}
                            </button>
                        ))
                    }
                </div>
            </div>
            <br />
            <h1 className={'title is-3 ' + styles2.subtitle}>SIDO y la NOM-035</h1>
            <div className='fixed-grid is-gap-2 has-5-columns has-1-cols-mobile'>
                <div className='grid'>
                    {
                        SIDOyNOM035.map((concept) => (
                            <button className={'mb-5 p-4 modal-button ' + styles.textwrap + ' ' + styles.button4} data-target='modal' key={concept.id} onClick={() => handleSIDOyNOM035(concept)}>
                                {concept.title}
                            </button>
                        ))
                    }
                </div>
            </div>
            <br />
            <h1 className={'title is-3 ' + styles2.subtitle}>Tabla de variables evaluadas por SIDO, EL OCQ y la NOM-035-STPS-2018</h1>
            <div className='is-flex is-justify-content-space-around'>
                <table className={'table is-bordered ' + styles2.table}>
                    <thead>
                        <tr>
                            <th className='has-text-centered'>SIDO</th>
                            <th className='has-text-centered'>OCQ (Organization Climate Questionnaire)</th>
                            <th className='has-text-centered'>NOM-035 (Guías II y III)</th>
                        </tr>
                    </thead>
                    <tbody className='has-text-centered'>
                        {
                            rows.map((row, index) => (
                                <tr key={index}>
                                    {row.map((item, index) => (
                                        <td key={index} className={styles2.text}>{item}</td>
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <div id='modal' className={`modal ${isActive ? 'is-active is-clipped' : ''}`}>
                <div className='modal-background' onClick={() => setIsActive(false)}></div>
                <div className='modal-content'>
                    {despConcept.title && <h1 className={'title is-3 ' + styles2.title2}>{despConcept.title}</h1>}
                    <ul className={'box has-text-justified ' + styles.list + ' ' + styles2.text}>
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

            <div id='modalnom' className={`modal ${isActiveNom ? 'is-active is-clipped' : ''}`}>
                <div className='modal-background' onClick={() => setIsActiveNom(false)}></div>
                <div className='modal-content'>
                    {NOM.title && <h1 className={'title is-3 ' + styles2.title2}>{NOM.title}</h1>}
                    <ul className={'box has-text-justified ' + styles.list + ' ' + styles2.text}>
                        {
                            NOM.content && <p className='is-size-5 has-text-justified'>{NOM.content}</p>
                        }
                        {
                            NOM.list && NOM.list.map((item, index) => (
                                <li key={index} className='is-size-5 ml-5'>{item}</li>
                            ))
                        }
                        {
                            NOM.afterlist && <p className='is-size-5 has-text-justified'>{NOM.afterlist}</p>
                        }
                    </ul>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setIsActiveNom(false)}></button>
            </div>

            <div id='modalsidonom' className={`modal ${isActiveSidonom ? 'is-active is-clipped' : ''}`}>
                <div className='modal-background' onClick={() => setIsActiveSidonom(false)}></div>
                <div className='modal-content'>
                    {sidonom.title && <h1 className={'title is-3 ' + styles2.title2}>{sidonom.title}</h1>}
                    <ul className={'box has-text-justified ' + styles.list + ' ' + styles2.text}>
                        {
                            sidonom.content && <p className='is-size-5 has-text-justified'>{sidonom.content}</p>
                        }
                        {
                            sidonom.list && sidonom.list.map((item, index) => (
                                <li key={index} className='is-size-5 ml-5'>{item}</li>
                            ))
                        }
                        {
                            sidonom.afterlist && <p className='is-size-5 has-text-justified'>{sidonom.afterlist}</p>
                        }
                    </ul>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setIsActiveSidonom(false)}></button>
            </div>
        </div>
    )
}