import { useContext, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AuthenContext } from "../provider/AuthenProvider"

export default function TopHeader({ ...props }) {
    const [show, setShow] = useState(false)
    let authCtx = useContext(AuthenContext)
    let history = useHistory();

    let logout = () => {
        authCtx.logout()
        history.replace("/login")
    }

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img style={{ width: 30 }} className="rounded-circle profile-img-card" src="/logo192.png" /></Link>
            <button className="navbar-toggler" type="button" onClick={() => setShow(!show)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${show && 'show'}`}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/accounts">Accounts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/statistics">Statistics</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/clients">Clients</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/emails">Email</Link>
                    </li>
                </ul>
                <form className="d-flex">
                    <button className="btn btn-outline-light" type="button" onClick={logout}>Logout {authCtx.user?.name}</button>
                </form>
            </div>
        </div>
    </nav>
}