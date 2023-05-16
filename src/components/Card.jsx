import React from 'react';
import { useState } from 'react';
import "../design/Tablero.css";

const Card = ({ card, users }) => {
    return(
        <div className="card-details">
            {/* Nombre de tarjeta */}
            <strong>{card.title}</strong>
             {users.map((user) => { // * Mapeo de usuarios
                    if (user.user_id === card.owner_user_id) { //* Validar si el usuario es dueño de la tarjeta
                        // * Mostrar nombre de usuario
                        return <p><strong>Owner:</strong> {user.realname}</p>
                    }
                })
             }
            
            <p>
                <strong>Priority:</strong> 
                {
                    // card.priority === 1 ? <span className="low-priority"> Crítica</span> : 
                    // card.priority === 2 ? <span className="medium-priority"> Alta</span> : 
                    // card.priority === 3 ? <span className="average-priority"> Promedio</span> :
                    // card.priority === 4 ? <span className="low-priority"> Baja</span> : null
                    card.priority === 1 ? <span className="low-priority"> Crítica</span> :
                    card.priority === 2 ? <span className="medium-priority"> Alta</span> :
                    card.priority === 3 ? <span className="average-priority"> Promedio</span> :
                    card.priority === 4 ? <span className="low-priority"> Baja</span> : 
                    card.priority === null ? <span className="low-priority"> Promedio</span> : null //TODO: Revisar
                }
            </p>
            {/* Deadline dependiente de si tiene o no tiene */}
            {card.deadline === null ? <p><strong>Deadline:</strong> Sin deadline</p> : <p><strong>Deadline:</strong> {(card.deadline).substring(0,10)}</p>}
        </div>
    )
}

export default Card;