import Header from './Home/Header'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Overview from './Home/Overview'
import Concepts from './Home/Concepts'
import Results from './Home/Results'
import Summary from './Home/Summary'
import Footer from './Footer'
import ControlPanel from './ControlPanel'

export default function Homepage() {

    const navigate = useNavigate()
    const isAuth = localStorage.getItem('isAuth') === 'true'
    const [activeTab, setActiveTab] = useState('Overview')

    useEffect(() => {
        if (!isAuth) navigate('/', { replace: true })
    }, [isAuth, navigate])

    return (
        <>
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            <div>
                {activeTab === 'Overview' && <Overview />}
                {activeTab === 'Concepts' && <Concepts />}
                {activeTab === 'Results' && <Results />}
                {activeTab === 'Summary' && <Summary />}
                {activeTab === 'Control Panel' && <ControlPanel />}
            </div>
            <br />
            <br />
            <Footer />
        </>
    )
}