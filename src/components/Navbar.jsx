import React, {useContext} from "react";
import {ChatContext} from "../context/ChatProvider";

const Navbar = () => {

    const {usuario, ingresoUsuario, cerrarSeccion} = useContext(ChatContext);

    const cerrarSesion = () => {
        cerrarSeccion();
    }

    const iniciarSesion = () => {
        ingresoUsuario();
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <span className="navbar-brand">Chat</span>
            <div>
                {
                    usuario.estado ?
                        <button
                            className="btn btn-outline-danger my-2 my-sm-0"
                            onClick={cerrarSesion}
                        >
                            Salir
                        </button>
                        :
                        <button
                            className="btn btn-outline-success my-2 my-sm-0"
                            onClick={iniciarSesion}
                        >
                            Acceder
                        </button>
                }
            </div>
        </nav>
    )
}

export default Navbar;