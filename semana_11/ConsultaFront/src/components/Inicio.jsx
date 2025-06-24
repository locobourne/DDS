
import { Link } from "react-router-dom"
export default function Inicio({ usuario }) {
    return (
        <div>
            <nav className="navbar navbar-light bg-light w-100">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                        <Link className="nav-link me-3" to="/inicio">Inicio</Link>
                        <Link className="nav-link" to="/consulta">Consulta</Link>
                    </div>
                    <div>
                        Usuario: <strong>{usuario.email}</strong>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <main>
                    <h5>Sistema de consultas</h5>
                </main>
            </div>
        </div>

    )
}