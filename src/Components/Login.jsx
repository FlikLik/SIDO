import '../Styles/login.css'

export default function Login() {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center is-align-content-center is-flex-wrap-wrap">
            <div className='title is-1 m-6 has-text-centered '>
                Sistema Integral de Diagnóstico Organizacional
            </div>
            <section className='section has-background-primary-85'>
                <h2 className='subtitle is-2 has-text-centered has-text-weight-bold'>
                    Login
                </h2>
                <figure className='image is-96x96'>
                    <img src='user.png' alt='user.png' />
                </figure>
                <br />
                <form className='field control has-icons-left is-flex is-flex-direction-column is-align-items-center is-justify-content-center'>
                    <input className='input is-rounded is-medium' type="text" placeholder="User Code" />
                    <span className='icon is-medium is-left'>
                        <img src="key.svg" alt="key" width={35} height={35} />
                    </span>
                    <br />
                    <button type='submit' className='button is-info' onClick={handleSubmit}>Login</button>
                </form>
            </section>
        </div>
    )
}