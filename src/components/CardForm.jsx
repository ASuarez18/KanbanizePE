import { useState } from "react";

import '../design/CardForm.css'

const CardForm = ( {workflow, columns, users, backlogs}) => {
    let apikey = localStorage.getItem('apikey');
    // const [backlog_id, setBacklog_id] = useState(""); // Id de backlog (columna) obtenido de ...
    let backlog_id = 0;
    const [lane_id, setLane_id] = useState(workflow.workflow_id); // Id del workflow
    const [title, setTitle] = useState(""); // Título de la tarjeta
    const [deadline, setDeadline] = useState(""); // Fecha límite de la tarjeta
    const [owner_user_id, setOwner_user_id] = useState(0); // Id del usuario dueño de la tarjeta
    const [priority, setPriority] = useState(0); // Prioridad de la tarjeta
    // let backlogs = [];
    
    const [error, setError] = useState(null); // Error de validación
    
    //TODO: Mover este código a un componente arriba
    // Recorrer columnas y obtener el backlog_id de la columna que tenga el nombre "Backlog"
    // columns.map((column) => {
    //     if (column.name === "Backlog") {
    //         backlogs.push(column);
    //     }
    // })

    backlogs.map((backlog) => {
        if (backlog.workflow_id === workflow.workflow_id) {
            backlog_id = backlog.column_id;
        }
    })

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleOwnerChange = (e) => {
        setOwner_user_id(e.target.value);
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();

        let deadlineDate = deadline + "T12:00:00Z";

        const card = {backlog_id, lane_id, title, deadlineDate, owner_user_id, priority};
        
        fetch('cards/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "apikey": apikey
            },
            body: JSON.stringify(card)
        }).then(() => {
            console.log("Backlog_id: " + backlog_id, "lane_id: " + lane_id, "title: " + title, "deadline: " + deadlineDate, "owner_user_id: " + owner_user_id, "priority: " + priority)
            // window.location.reload();
        })

        // const response = fetch('http://localhost:3001/cards/create', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "apikey": apikey
        //     },
        //     body: JSON.stringify(card)
        // });

        // const data = response.json();
        // if (data.response === 'Invalid apikey') {
        //     alert("Invalid apikey");
        // }
        // if (!response.ok){
        //     setError("Error al crear tarjeta");
        // }
        // if (response.ok){
        //     alert("Card created");
        //     setTitle("");
        //     setLane_id("");
        //     setDeadline("");
        //     setOwner_user_id("");
        //     setPriority("");
        // }
    }

    return(
        <form className="card-form" onSubmit={handleSubmit}>
            <h5>Crear tarjeta</h5>
            <h6>Backlog_ID {backlog_id}</h6>
            <label>Titulo de tarjeta: </label>
            <input 
                type="text" 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Deadline:</label>
            <input 
                type="date" 
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
            />
            <label>Dueño de tarjeta:</label>
            <select value={owner_user_id} onChange={handleOwnerChange} >
                <option value="">Seleccione un owner</option>
                <option value="null">Ninguno</option>
                {users.map((user) => {
                    return(
                        <option value={user.user_id}>{user.username}</option>
                    )
                })}
            </select>
            <label>Prioridad:</label>
            <select value={priority} onChange={handlePriorityChange}>
                <option value="null">Seleccione la prioridad</option>
                <option value="1">Crítico</option>
                <option value="2">Alta</option>
                <option value="3">Promedio</option>
                <option value="4">Baja</option>
            </select>
            <button>Crear Tarjeta</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CardForm;