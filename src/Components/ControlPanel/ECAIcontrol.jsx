import { useState, useEffect } from 'react'
import styles from '../../Styles/general.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ECAIcontrol() {

    const [results, setResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [data, setData] = useState({ name: '', educacionValue: '', capacitacionValue: '', adiestramientoValue: '', instruccionValue: '', advance: '', waste: '', year: '' })
    const [idEdit, setIdEdit] = useState(0)
    const [operation, setOperation] = useState('')
    const [render, setRender] = useState(0)

    useEffect(() => {
        const name = localStorage.getItem('company')
        axios.post('https://sido-9e7g.onrender.com/getECAI', { name })
            .then(response => {
                setResults(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: ECAI Failure')
                console.log(error);
            })
    }, [render])

    const reset = () => {
        showModal && setShowModal(false)
        showConfirm && setShowConfirm(false)
        setIdEdit(0)
        setOperation('')
        setData({ educacionValue: '', capacitacionValue: '', adiestramientoValue: '', instruccionValue: '', advance: '', waste: '', year: '' })
    }

    const edit = (id, eVal, cVal, aVal, iVal, adv, waste, year) => {
        !showModal && setShowModal(true)
        setOperation('edit')
        setIdEdit(id)
        setData({ educacionValue: eVal, capacitacionValue: cVal, adiestramientoValue: aVal, instruccionValue: iVal, advance: adv, waste: waste, year: year })
    }

    const add = () => {
        !showModal && setShowModal(true)
        setOperation('add')
    }

    const confirm = (id) => {
        !showConfirm && setShowConfirm(true)
        setIdEdit(id)
    }

    const del = () => {
        const loading = toast.loading('Eliminando...', { className: styles.toastLoading })
        axios.post('https://sido-9e7g.onrender.com/deleteECAI', { id: idEdit })
            .then(response => {
                toast.update(loading, { render: 'Resultado eliminado', type: 'success', isLoading: false, autoClose: 3000, className: styles.toastLoading })
                setRender(render + 1)
                setShowConfirm(false)
                console.log(response.data)
            }).catch(error => {
                toast.update(loading, { render: 'Error al eliminar el resultado', type: 'error', isLoading: false, autoClose: 3000, className: styles.toastError })
                console.log('Error al eliminar el resultado', error)
            })
    }

    const save = () => {
        const loading = toast.loading('Haciendo el registro...', { className: styles.toastLoading })
        const name = localStorage.getItem('company')
        switch (operation) {
            case 'add':
                axios.post('https://sido-9e7g.onrender.com/addECAI', { name: name, eduVal: data.educacionValue, capVal: data.capacitacionValue, adiVal: data.adiestramientoValue, insVal: data.instruccionValue, advance: data.advance, waste: data.waste, year: data.year })
                    .then(response => {
                        toast.update(loading, { render: 'Resultado registrado', type: 'success', isLoading: false, autoClose: 3000, className: styles.toastLoading })
                        console.log(response.data)
                        setRender(render + 1)
                        setShowModal(false)
                    }).catch(error => {
                        toast.update(loading, { render: 'Error al registrar el resultado', type: 'error', isLoading: false, autoClose: 3000, className: styles.toastError })
                        console.log('Error al registrar el resultado', error)
                    })
                break
            case 'edit':
                axios.post('https://sido-9e7g.onrender.com/editECAI', { id: idEdit, eduVal: data.educacionValue, capVal: data.capacitacionValue, adiVal: data.adiestramientoValue, insVal: data.instruccionValue, advance: data.advance, waste: data.waste, year: data.year })
                    .then(response => {
                        toast.update(loading, { render: 'Resultado actualizado ID modificado: ' + idEdit, type: 'success', isLoading: false, autoClose: 3000, className: styles.toastLoading })
                        console.log(response.data)
                        setRender(render + 1)
                        setShowModal(false)
                    }).catch(error => {
                        toast.update(loading, { render: 'Error al actualizar el resultado', type: 'error', isLoading: false, autoClose: 3000, className: styles.toastError })
                        console.log('Error al actualizar el resultado', error)
                    })
                break

        }
    }

    return (
        <div>
            {
                results.length > 0 ? (
                    <>
                        <button className='button is-info' onClick={add}>Agregar resultado</button>
                        <br />
                        <br />
                        <div className='table-container'>
                            <table className={'table is-fullwidth is-hoverable is-bordered is-striped ' + styles.table}>
                                <thead>
                                    <tr>
                                        <td className='has-text-centered has-text-weight-bold'>Educación</td>
                                        <td className='has-text-centered has-text-weight-bold'>Capacitación</td>
                                        <td className='has-text-centered has-text-weight-bold'>Adiestramiento</td>
                                        <td className='has-text-centered has-text-weight-bold'>Instrucción</td>
                                        <td className='has-text-centered has-text-weight-bold'>Avance</td>
                                        <td className='has-text-centered has-text-weight-bold'>Desperdicio</td>
                                        <td className='has-text-centered has-text-weight-bold'>Año</td>
                                        <td className='has-text-centered has-text-weight-bold'>Acciones</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        results.map((result, index) => (
                                            <tr key={index}>
                                                <td className='has-text-centered'>{result.educacionValue}</td>
                                                <td className='has-text-centered'>{result.capacitacionValue}</td>
                                                <td className='has-text-centered'>{result.adiestramientoValue}</td>
                                                <td className='has-text-centered'>{result.instruccionValue}</td>
                                                <td className='has-text-centered'>{result.advance}</td>
                                                <td className='has-text-centered'>{result.waste}</td>
                                                <td className='has-text-centered'>{result.year}</td>
                                                <td className='has-text-centered'>
                                                    <button className='button is-info is-small m-1' onClick={() => edit(result.id, result.educacionValue, result.capacitacionValue, result.adiestramientoValue, result.instruccionValue, result.advance, result.waste, result.year)}>
                                                        <span className='icon is-small'>
                                                            <img src='editIcon.svg' alt='edit' width={20} height={20} />
                                                        </span>
                                                    </button>
                                                    <button className='button is-danger is-small m-1' onClick={() => confirm(result.id)}>
                                                        <span className='icon is-small'>
                                                            <img src='deleteIcon.svg' alt='delete' width={20} height={20} />
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : <div className='has-text-centered is-size-2 has-text-black' style={{ opacity: 0.5 }}>
                    <figure>
                        <img src="404notfound.svg" alt="404 not found" width={200} height={200} />
                    </figure>
                    <p>Cargando...</p>
                </div>
            }
            <div id='modal' className={`modal ${showModal ? 'is-active is-clipped' : ''}`}>
                <div className='modal-background'></div>
                <div className='modal-card'>
                    <header className='modal-card-head'>
                        <p className={'modal-card-title ' + styles.title2}>Agregar Resultado ECAI</p>
                        <button className='delete' aria-label='close' onClick={reset}></button>
                    </header>
                    <section className='modal-card-body'>
                        <div className='fixed-grid has-1-cols-mobile'>
                            <div className='grid'>
                                <div className='cell'>
                                    <div className='field is-horizontal'>
                                        <div className='field-body'>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Valor de Educación</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder='Educación' value={data.educacionValue} onChange={(e) => setData({ ...data, educacionValue: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Valor de Capacitación</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder='Capacitación' value={data.capacitacionValue} onChange={(e) => setData({ ...data, capacitacionValue: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Valor de Adiestramiento</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder='Adiestramiento' value={data.adiestramientoValue} onChange={(e) => setData({ ...data, adiestramientoValue: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Valor de Instrucción</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder='Instrucción' value={data.instruccionValue} onChange={(e) => setData({ ...data, instruccionValue: e.target.value })} required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='cell'>
                                    <div className='field is-horizontal'>
                                        <div className='field-body'>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Avance</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder='Avance' value={data.advance} onChange={(e) => setData({ ...data, advance: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Desperdicio</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder='Desperdicio' value={data.waste} onChange={(e) => setData({ ...data, waste: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Año</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder='Año' value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className='modal-card-foot'>
                        <div className='buttons'>
                            <button className='button is-success' onClick={save}>Guardar</button>
                            <button className='button' onClick={reset}>Cancelar</button>
                        </div>
                    </footer>
                </div>
            </div>
            <div className={`modal ${showConfirm ? 'is-active is-clipped' : ''}`}>
                <div className='modal-background'></div>
                <div className='modal-content box'>
                    <h2 className='subtitle is-3 has-text-centered'>¿Estás seguro que deseas eliminar este registro?</h2>
                    <button className='button is-danger m-4' onClick={del}>Eliminar</button>
                    <button className='button' onClick={reset}>Cancelar</button>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={reset}></button>
            </div>
        </div>
    )
}