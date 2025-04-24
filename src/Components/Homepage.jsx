import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {

    const navigate = useNavigate()
    const isAuth = localStorage.getItem('isAuth') === 'true'

    useEffect(() => {
        if (!isAuth) navigate('/', { replace: true })
    }, [isAuth, navigate])

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('isAuth')
        navigate('/', { replace: true })
    }

    return (
        <>
            Homepage
            <br />
            <button type="button" className='button is-danger' onClick={handleLogout}>Logout</button>
        </>
    )
}