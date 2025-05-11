import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from '../../Styles/general.module.css'
import { toast } from 'react-toastify'

export default function NOMres() {

    const [resTwo, setResTwo] = useState([])
    const [resThree, setResThree] = useState([])

    useEffect(() => {
        axios.post('https://sido-9e7g.onrender.com/nomresults', { name: localStorage.getItem('company'), guide: '2' })
            .then(response => {
                setResTwo(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: NOM-035 Failure Guide II')
                console.log(error)
            })
        axios.post('https://sido-9e7g.onrender.com/nomresults', { name: localStorage.getItem('company'), guide: '3' })
            .then(response => {
                setResThree(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: NOM-035 Failure Guide III')
                console.log(error)
            })
    }, [])

    return (
        <div className='fixed-grid has-1-cols-mobile'>
            <div className='grid'>
                <div className='cell'>
                    <h1 className={'title is-3 ' + styles.subtitle}>Guía II</h1>
                    {
                        resTwo.length > 0 && (
                            <div className='table-container'>
                                <table className={'table is-hoverable is-fullwidth is-bordered ' + styles.table}>
                                    <thead>
                                        <tr>
                                            <th className='has-text-centered'>Dominio evaluado</th>
                                            <th className='has-text-centered'>% en nivel medio a muy alto</th>
                                            <th className='has-text-centered'>Interpretación y cruce con "Riesgos psicosociales"</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            resTwo.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='has-text-centered'>{item.domain}</td>
                                                    <td className='has-text-centered'>{item.rate}</td>
                                                    <td className='has-text-centered'>{item.interpretation}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
                <div className='cell'>
                    <h1 className={'title is-3 ' + styles.subtitle}>Guía III</h1>
                    {
                        resThree.length > 0 && (
                            <div className='table-container'>
                                <table className={'table is-hoverable is-fullwidth is-bordered ' + styles.table}>
                                    <thead>
                                        <tr>
                                            <th className='has-text-centered'>Dominio evaluado</th>
                                            <th className='has-text-centered'>% en nivel medio a muy alto</th>
                                            <th className='has-text-centered'>Interpretación y cruce con "Riesgos psicosociales"</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            resThree.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='has-text-centered'>{item.domain}</td>
                                                    <td className='has-text-centered'>{item.rate}</td>
                                                    <td className='has-text-centered'>{item.interpretation}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}