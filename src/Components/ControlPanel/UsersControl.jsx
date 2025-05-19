import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import styles from '../../Styles/general.module.css'

export default function UsersControl() {

    const [results, setResults] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [data, setData] = useState({ name: '', position: '', area: '', isAdmin: '' })
    const [idEdit, setIdEdit] = useState(0)
    const [operation, setOperation] = useState('')
    const [render, setRender] = useState(0)

    useEffect(() => {
        const name = localStorage.getItem('company')
        axios.post('https://sido-9e7g.onrender.com/getUsers', { name })
            .then(response => {
                setResults(response.data)
            })
            .catch(error => {
                toast.error('Error al conectar al servidor: Users Failure')
                console.log(error);
            })
    }, [render])

    const reset = () => {
        showModal && setShowModal(false)
        showConfirm && setShowConfirm(false)
        setIdEdit(0)
        setOperation('')
        setData({ name: '', position: '', area: '', isAdmin: '' })
    }

    const edit = (id, pos, area, isAdmin) => {
        !showModal && setShowModal(true)
        setOperation('edit')
        setIdEdit(id)
        setData({ position: pos, area: area, isAdmin: isAdmin })
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
        axios.post('https://sido-9e7g.onrender.com/deleteUser', { id: idEdit })
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

    const generateCode = () => {
        const letters = data.name.split(' ').map(word => word[0].toUpperCase()).join('')
        const numbers = Math.floor(1000 + Math.random() * 9000)
        return `${letters}${numbers}`
    }

    const save = () => {
        const loading = toast.loading('Haciendo el registro...', { className: styles.toastLoading })
        const name = localStorage.getItem('company')
        switch (operation) {
            case 'add':
                axios.post('https://sido-9e7g.onrender.com/addUser', { code: generateCode(), name: name, position: data.position, area: data.area, isAdmin: data.isAdmin })
                    .then(response => {
                        toast.update(loading, { render: 'Usuario registrado', type: 'success', isLoading: false, autoClose: 3000, className: styles.toastLoading })
                        console.log(response.data)
                        setRender(render + 1)
                        setShowModal(false)
                    })
                    .catch(error => {
                        toast.update(loading, { render: 'Error al registrar el usuario', type: 'error', isLoading: false, autoClose: 3000, className: styles.toastError })
                        console.log('Error al registrar el usuario', error)
                    })
                break
            case 'edit':
                axios.post('https://sido-9e7g.onrender.com/editUser', { id: idEdit, position: data.position, area: data.area, isAdmin: data.isAdmin })
                    .then(response => {
                        toast.update(loading, { render: 'Usuario actualizado ID modificado: ' + idEdit, type: 'success', isLoading: false, autoClose: 3000, className: styles.toastLoading })
                        console.log(response.data)
                        setRender(render + 1)
                        setShowModal(false)
                    })
                    .catch(error => {
                        toast.update(loading, { render: 'Error al actualizar el usuario', type: 'error', isLoading: false, autoClose: 3000, className: styles.toastError })
                        console.log('Error al actualizar el usuario', error)
                    })
                break
        }
    }

    return (
        <div>
            {
                results.length > 0 ? (
                    <>
                        <button className='button is-info' onClick={add}>Agregar usuario</button>
                        <br />
                        <br />
                        <div className={'table-container ' + styles.table}>
                            <table className={'table is-fullwidth is-hoverable is-bordered is-striped ' + styles.table}>
                                <thead>
                                    <tr>
                                        <td className='has-text-centered has-text-weight-bold'>Código</td>
                                        <td className='has-text-centered has-text-weight-bold'>Posición</td>
                                        <td className='has-text-centered has-text-weight-bold'>Departamento</td>
                                        <td className='has-text-centered has-text-weight-bold'>Administrador?</td>
                                        <td className='has-text-centered has-text-weight-bold'>Acciones</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        results.map((result, index) => (
                                            <tr key={index}>
                                                <td className='has-text-centered'>{result.code}</td>
                                                <td className='has-text-centered'>{result.position}</td>
                                                <td className='has-text-centered'>{result.area}</td>
                                                <td className='has-text-centered'>{result.isAdmin === 1 ? 'Si' : 'No'}</td>
                                                <td className='has-text-centered'>
                                                    <button className='button is-info is-small mr-4' onClick={() => edit(result.id, result.position, result.area, result.isAdmin)}>
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
                        <p className={'modal-card-title ' + styles.title2}>Agregar Usuario</p>
                        <button className='delete' aria-label='close' onClick={reset}></button>
                    </header>
                    <section className='modal-card-body'>
                        <div className='fixed-grid has-1-cols-mobile'>
                            <div className='grid'>
                                <div className='cell'>
                                    <div className='field is-horizontal'>
                                        <div className='field-body'>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Nombre</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='text' placeholder='Nombre' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Posición</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='text' placeholder='Posición' value={data.position} onChange={(e) => setData({ ...data, position: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Departamento</label>
                                                <div className='control'>
                                                    <input className='input is-normal' type='text' placeholder='Departamento' value={data.area} onChange={(e) => setData({ ...data, area: e.target.value })} required />
                                                </div>
                                            </div>
                                            <div className='field'>
                                                <label className={'label ' + styles.text}>Administrador?</label>
                                                <div className='control'>
                                                    <input type="radio" name="isAdmin" className='mr-2' onChange={() => setData({ ...data, isAdmin: 1 })} checked={data.isAdmin === 1} />
                                                    Si
                                                    <input type="radio" name="isAdmin" className='ml-2 mr-2' onChange={() => setData({ ...data, isAdmin: 0 })} checked={data.isAdmin === 0} />
                                                    No
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