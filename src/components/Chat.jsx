import React, {useContext, useEffect, useRef} from 'react';
import {ChatContext} from '../context/ChatProvider';
import AgregarComentario from './AgregarComentario';
import moment from 'moment';
import 'moment/locale/es.js'; // Pasar a español

const Chat = () => {

    const {usuario, mensajes} = useContext(ChatContext);
    const refZonaChat = useRef(null);
    // refZonaChat Es para acceder a todos los elementos

    useEffect(() => {
        if (refZonaChat.current !== null) {
            refZonaChat.current.scrollTop = refZonaChat.current.scrollHeight;
        }
    }, [mensajes])

    return (
        <div
            className='mt-3 px-2'
            style={{height: '75vh', overflowY: 'scroll'}}
            ref={refZonaChat}
        >
            {
                mensajes.map((item, index) => (
                    usuario.uid === item.uid ? (
                        <div className="d-flex justify-content-end mb-3" key={index}>
                            <span className="badge badge-pill badge-primary">
                                {item.displayName} - {moment(item.fecha).calendar()}<br/><br/>
                                {item.texto}
                            </span>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-start mb-3" key={index}>
                            <span className="badge badge-pill badge-secondary">
                                {moment(item.fecha).calendar()} - {item.displayName}<br/><br/>
                                {item.texto}
                            </span>
                        </div>
                    )
                ))
            }
            <AgregarComentario/>
        </div>
    )
}

export default Chat