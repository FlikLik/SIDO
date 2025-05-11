import styles from '../Styles/footer.module.css'
import styles2 from '../Styles/general.module.css'

export default function Footer() {
    return (
        <div className={"footer has-text-centered " + styles.footer}>
            <div className="content columns">
                <div className="column">
                    <h1 className={"title is-4 " + styles2.subtitle}>SIDO © 2025</h1>
                    <p className={styles2.text}>Todos los derechos reservados</p>
                </div>
                <div className="column">
                    <h1 className={"title is-4 " + styles2.subtitle}>Desarrollado por: Ing. Ulick Dorantes R.</h1>
                    <p className={styles2.text}>En colaboración con el departamento de MIA del TecNM Campus Orizaba</p>
                </div>
                <div className="column">
                    <h1 className={"title is-4 " + styles2.subtitle}>Contacto</h1>
                    <p className={styles2.text}>LinkedIn: <a href="https://www.linkedin.com/in/ulickdr/" target="_blank" rel="noreferrer">Ulick DR.</a><br />
                        Email: <a href="mailto:ulick_doro@outlook.es" target="_blank" rel="noreferrer">Outlook</a></p>

                </div>
            </div>
        </div>
    )
}