import { useState, useEffect } from 'react'
import styles from '../../Styles/general.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function NOMcontrol() {

    const [results, setResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [data, setData] = useState({ name: '', guide: '', domain: '', rate: '', interpretation: '' })
    const [idEdit, setIdEdit] = useState(0)
    const [operation, setOperation] = useState('')
    const [render, setRender] = useState(0)

    useEffect(() => {
        const name = localStorage.getItem('company')
        axios.post('https://sido-9e7g.onrender.com/getNOM', { name })
            .then(response => {
                setResults(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: NOM Failure')
                console.log(error);
            })
    }, [render])

    const reset = () => {
        showModal && setShowModal(false)
        showConfirm && setShowConfirm(false)
        setIdEdit(0)
        setOperation('')
        setData({ name: '', guide: '', domain: '', rate: '', interpretation: '' })
    }

    const edit = (id, guide, domain, rate, interpretation) => {
        !showModal && setShowModal(true)
        setOperation('edit')
        setIdEdit(id)
        setData({ name: id, guide: guide, domain: domain, rate: rate, interpretation: interpretation })
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
        axios.post('https://sido-9e7g.onrender.com/deleteNOM', { id: idEdit })
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
                axios.post('https://sido-9e7g.onrender.com/addNOM', { name: name, guide: data.guide, domain: data.domain, rate: data.rate, interpretation: data.interpretation })
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
                axios.post('https://sido-9e7g.onrender.com/editNOM', { id: idEdit, guide: data.guide, domain: data.domain, rate: data.rate, interpretation: data.interpretation })
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
                        <div className={'table-container ' + styles.table}>
                            <table className={'table is-fullwidth is-hoverable is-bordered is-striped '}>
                                <thead>
                                    <tr>
                                        <td className='has-text-centered has-text-weight-bold'>Guia</td>
                                        <td className='has-text-centered has-text-weight-bold'>Dominio</td>
                                        <td className='has-text-centered has-text-weight-bold'>Tasa</td>
                                        <td className='has-text-centered has-text-weight-bold'>Interpretación</td>
                                        <td className='has-text-centered has-text-weight-bold'>Acciones</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        results.map((result, index) => (
                                            <tr key={index}>
                                                <td className='has-text-centered'>{result.guide}</td>
                                                <td className='has-text-centered'>{result.domain}</td>
                                                <td className='has-text-centered'>{result.rate}</td>
                                                <td className='has-text-centered'>{result.interpretation}</td>
                                                <td className='has-text-centered'>
                                                    <button className='button is-info is-small mr-4' onClick={() => edit(result.id, result.guide, result.domain, result.rate, result.interpretation)}>
                                                        <span className='icon is-small'>
                                                            <img src='editIcon.svg' alt='edit' width={20} height={20} />
                                                        </span>
                                                    </button>
                                                    <button className='button is-danger is-small ' onClick={() => confirm(result.id)}>
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
                        <p className={'modal-card-title ' + styles.title2}>Agregar Resultado NOM-035</p>
                        <button className='delete' aria-label='close' onClick={reset}></button>
                    </header>
                    <section className='modal-card-body'>
                        <div className='fixed-grid has-1-cols-mobile'>
                            <div className='grid'>
                                <div className='cell'>
                                    <div className='field is-horizontal'>
                                        <div className='field-body'>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>No. de Guía</label>
                                                <div className='control'>
                                                    <input type="radio" name='guide' className='mr-2' onChange={() => setData({ ...data, guide: 2 })} checked={data.guide === 2} />
                                                    2
                                                    <br />
                                                    <input type="radio" name='guide' className='mr-2' onChange={() => setData({ ...data, guide: 3 })} checked={data.guide === 3} />
                                                    3
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Dominio</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='text' placeholder='Dominio' value={data.domain} onChange={(e) => setData({ ...data, domain: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Tasa</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder='Tasa' value={data.rate} onChange={(e) => setData({ ...data, rate: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Interpretación</label>
                                                <div className='control'>
                                                    <textarea className='textarea' placeholder='Interpretación' value={data.interpretation} onChange={(e) => setData({ ...data, interpretation: e.target.value })} required />
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
                    <button className='button is-danger mr-4' onClick={del}>Eliminar</button>
                    <button className='button' onClick={reset}>Cancelar</button>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={reset}></button>
            </div>
        </div>
    )
}