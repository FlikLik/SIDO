import { description } from "../../Backend/HomeInfo/description.js"
import { useState, useEffect } from "react"
import axios from "axios"
import styles from '../../Styles/overview.module.css'
import styles2 from '../../Styles/general.module.css'

export default function Overview() {

    const [companies, setCompanies] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/companies')
            .then(res => setCompanies(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container has-text-centered">
            <section className="has-text-centered mt-4">
                <figure>
                    <img src="itologo.png" alt="logo" width={700} height={200} style={{ borderRadius: '50px' }} />
                </figure>
            </section>

            <div className="fixed-grid has-2-cols mt-6 has-1-cols-mobile">
                <div className="grid has-text-centered">
                    {
                        description.map((item) => (
                            <div key={item.id} className="mb-6">
                                {
                                    item.type === 'question' && (
                                        <div className="cell">
                                            <figure>
                                                <img src={item.img} alt={item.img} width={150} height={150} />
                                            </figure>
                                            <h1 className={"title " + styles2.title}> {item.label} </h1>
                                        </div>
                                    )}
                                {
                                    item.type === 'answer' && (
                                        <div className={"box cell has-text-justified " + styles.infoBox}>
                                            <p className={"subtitle is-4 " + styles.infoBoxText + " " + styles2.text}> {item.label} </p>
                                        </div>
                                    )}
                            </div>
                        ))
                    }
                </div>
            </div>

            <br />
            <h1 className={"title is-1 " + styles2.title2}>Empresas que han utilizado SIDO</h1>
            <br />
            <div className="fixed-grid has-2-cols mt-6 has-1-cols-mobile">
                {
                    companies.map((company) => (
                        <div key={company.id} className="grid has-text-centered">
                            <div className="cell mb-6">
                                <div>
                                    <figure>
                                        <img src={company.urlLogo} alt={company.name + ' logo'} width={300} height={150} />
                                    </figure>
                                    <h1 className="title"> {company.name} </h1>
                                    <h3 className="subtitle has-text-black"> {company.line}</h3>
                                </div>
                            </div>
                            <div className={"cell has-text-justified p-2 " + styles.companiesInfobox + " " + styles2.text} >
                                <p className="subtitle is-4 has-text-black"><strong>Mision:</strong> {company.mision} <br /> <br /> <strong>Visión:</strong> {company.vision}</p>
                            </div>
                            <br />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}