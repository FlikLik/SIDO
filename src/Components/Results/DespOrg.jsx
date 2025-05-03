import { useState, useEffect } from 'react'
import axios from 'axios'

export default function DespOrg() {

    const [data, setData] = useState([])
    const [phase, setPhase] = useState('')

    useEffect(() => {
        const name = localStorage.getItem('company')
        const year = '2024'
        axios.post('http://localhost:3000/desperdicio', { name, year })
            .then(response => {
                setData({ advance: response.data.advance, waste: response.data.waste })
                detAdvanceDesp(response.data.advance, response.data.waste)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    function detAdvanceDesp(advance, waste) {
        if ((advance >= 0 && advance <= 40) & waste > 30) {
            setPhase('I. Control de calidad convencional')
        }
        else if ((advance >= 30.01 && advance <= 70) && (waste > 10.01 && waste <= 30)) {
            setPhase('II. Normalización')
        }
        else if ((advance >= 70.01 && advance <= 90) && (waste > 5 && waste <= 15)) {
            setPhase('III. Mejora')
        }
        else if ((advance >= 90.01 && advance <= 100) && waste <= 5) {
            setPhase('IV. Excelencia')
        }
    }

    return (
        <div className='has-text-centered'>
            <div className="table-container">
                <table className="table is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th className="has-text-centered">Etapa de evolución</th>
                            <th className="has-text-centered">Porcentaje de avance</th>
                            <th className="has-text-centered">Porcentaje de desperdicio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="has-text-centered">I. Control de calidad convencional</td>
                            <td className="has-text-centered">0% - 40%</td>
                            <td className="has-text-centered">Mayor al 30%</td>
                        </tr>
                        <tr>
                            <td className="has-text-centered">II. Normalización</td>
                            <td className="has-text-centered">30.01% - 70%</td>
                            <td className="has-text-centered">10.01% - 30%</td>
                        </tr>
                        <tr>
                            <td className="has-text-centered">III. Mejora</td>
                            <td className="has-text-centered">70.01% - 90%</td>
                            <td className="has-text-centered">5% - 15%</td>
                        </tr>
                        <tr>
                            <td className="has-text-centered">IV. Excelencia</td>
                            <td className="has-text-centered">90.01% - 100%</td>
                            <td className="has-text-centered">Menor al 5%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div>
                <h2 className='title is-3'>Con un porcentaje de avance del {data.advance}% y un porcentaje de desperdicio del {data.waste}% <br />
                    La empresa se encuentra en la etapa: {phase}
                </h2>
            </div>
        </div>
    )
}