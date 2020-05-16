import React, {createContext, useEffect, useState, useCallback} from "react";
import {auth, db, provider} from "../firebase";

export const ChatContext = createContext();

const ChatProvider = (props) => {
    const dataUsuario = {displayName: null, uid: null, email: null, estado: null};
    const [usuario, setUsuario] = useState(dataUsuario);
    const [mensajes, setMensajes] = useState([]);

    const detectarUsuario = useCallback(async () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setUsuario({displayName: user.displayName.split(" ")[0], uid: user.uid, email: user.email, estado: true})
                cargarMensajes()
            } else {
                setUsuario({displayName: null, uid: null, email: null, estado: false})
            }
        })
    }, [setUsuario]);

    useEffect(() => {
        detectarUsuario()
    }, [detectarUsuario])

    const ingresoUsuario = async () => {
        try {
            await auth.signInWithPopup(provider);
        } catch (e) {
            console.log(e);
        }
    }

    const cerrarSeccion = () => {
        auth.signOut()
    }

    const cargarMensajes = () => {
        db.collection('chat').orderBy('fecha')
            .onSnapshot(query => {
                const arrayMensajes = query.docs.map(item => item.data());
                setMensajes(arrayMensajes);
            })
    }

    const agregarNuevoMensaje = async (displayName, uid, texto) => {
        try {
            await db.collection('chat').add({
                displayName,
                uid,
                texto,
                fecha: Date.now()
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ChatContext.Provider value={
            {
                usuario,
                ingresoUsuario,
                cerrarSeccion,
                mensajes,
                agregarNuevoMensaje
            }
        }>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatProvider