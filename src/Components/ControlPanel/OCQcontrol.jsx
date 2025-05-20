import { useState, useEffect } from 'react'
import styles from '../../Styles/general.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { KPIS } from '../Results/KPIS.js'

export default function OCQcontrol() {

    const [results, setResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [data, setData] = useState({ name: '', depname: '', id_employee: '', A: '', B: '', C: '', D: '', E: '', F: '', G: '', H: '', I: '', J: '', K: '', L: '', M: '', N: '', year: '' })
    const [idEdit, setIdEdit] = useState(0)
    const [operation, setOperation] = useState('')
    const [render, setRender] = useState(0)
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']

    useEffect(() => {
        const name = localStorage.getItem('company')
        axios.post('https://sido-9e7g.onrender.com/getOCQ', { name })
            .then(response => {
                setResults(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: OCQ Failure')
                console.log(error);
            })
    }, [render])

    const reset = () => {
        showModal && setShowModal(false)
        showConfirm && setShowConfirm(false)
        setIdEdit(0)
        setOperation('')
        setData({ name: '', depname: '', id_employee: '', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', i: '', j: '', k: '', l: '', m: '', n: '', year: '' })
    }

    const edit = (id, depname, id_employee, a, b, c, d, e, f, g, h, i, j, k, l, m, n, year) => {
        !showModal && setShowModal(true)
        setOperation('edit')
        setIdEdit(id)
        setData({ depname: depname, id_employee: id_employee, a: a, b: b, c: c, d: d, e: e, f: f, g: g, h: h, i: i, j: j, k: k, l: l, m: m, n: n, year: year })
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
        axios.post('https://sido-9e7g.onrender.com/deleteOCQ', { id: idEdit })
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
                axios.post('https://sido-9e7g.onrender.com/addOCQ', { name: name, depname: data.depname, id_employee: data.id_employee, a: data.a, b: data.b, c: data.c, d: data.d, e: data.e, f: data.f, g: data.g, h: data.h, i: data.i, j: data.j, k: data.k, l: data.l, m: data.m, n: data.n, year: data.year })
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
                axios.post('https://sido-9e7g.onrender.com/editOCQ', { id: idEdit, depname: data.depname, id_employee: data.id_employee, a: data.A, b: data.B, c: data.C, d: data.D, e: data.E, f: data.F, g: data.G, h: data.H, i: data.I, j: data.J, k: data.K, l: data.L, m: data.M, n: data.N, year: data.year })
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
                            <table className={'table is-fullwidth is-hoverable is-bordered is-striped ' + styles.table}>
                                <thead>
                                    <tr>
                                        <td className='has-text-centered has-text-weight-bold'>Departamento</td>
                                        <td className='has-text-centered has-text-weight-bold'>Empleado</td>
                                        {
                                            KPIS.map((kpi, index) => (
                                                <td className='has-text-centered has-text-weight-bold' key={index}>{kpi}</td>
                                            ))
                                        }
                                        <td className='has-text-centered has-text-weight-bold'>Año</td>
                                        <td className='has-text-centered has-text-weight-bold'>Acciones</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        results.map((results, index) => (
                                            <tr key={index}>
                                                <td className='has-text-centered'>{results.depName}</td>
                                                <td className='has-text-centered'>{results.id_employee}</td>
                                                {
                                                    KPIS.map((kpi, index) => (
                                                        <td className='has-text-centered' key={index}>{results[letters[index]]}</td>
                                                    ))
                                                }
                                                <td className='has-text-centered'>{results.year}</td>
                                                <td className='has-text-centered'>
                                                    <button className='button is-info is-small m-1' onClick={() => edit(results.id, results.depName, results.id_employee, results.A, results.B, results.C, results.D, results.E, results.F, results.G, results.H, results.I, results.J, results.K, results.L, results.M, results.N, results.year)}>
                                                        <span className='icon is-small'>
                                                            <img src='editIcon.svg' alt='edit' width={20} height={20} />
                                                        </span>
                                                    </button>
                                                    <button className='button is-danger is-small m-1' onClick={() => confirm(results.id)}>
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
                        <p className={'modal-card-title ' + styles.title2}>Agregar Resultado OCQ</p>
                        <button className='delete' aria-label='close' onClick={reset}></button>
                    </header>
                    <section className='modal-card-body'>
                        <div className='fixed-grid has-1-cols-mobile'>
                            <div className='grid'>
                                <div className='cell'>
                                    <div className='field'>
                                        <div className='field-body'>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Departamento</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='text' placeholder='Departamento' value={data.depname} onChange={(e) => setData({ ...data, depname: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Empleado</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='text' placeholder='Empleado' value={data.id_employee} onChange={(e) => setData({ ...data, id_employee: e.target.value })} required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='fixed-grid'>
                            <div className='grid'>
                                {
                                    KPIS.map((kpi, index) => (
                                        <div className='cell' key={index}>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>{kpi}</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='number' placeholder={kpi} value={data[letters[index].toLocaleLowerCase()]} onChange={(e) => setData({ ...data, [letters[index].toLocaleLowerCase()]: e.target.value })} required />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='field'>
                            <label className={'label ' + styles.text}>Año</label>
                            <div className='control'>
                                <input className='input is-normal' type='number' placeholder='Año' value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} required />
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