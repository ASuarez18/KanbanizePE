import { useState } from "react";

import '../design/CardForm.css'

const CardForm = ( {workflow, columns, users, backlogs}) => {
    let apikey = localStorage.getItem('apikey');
    let backlog_id = 0;
    const [lane_id, setLane_id] = useState(workflow.workflow_id); // Id del workflow
    const [title, setTitle] = useState(""); // Título de la tarjeta
    const [deadline, setDeadline] = useState(null); // Fecha límite de la tarjeta //TODO: Arreglar e implementar datepicke
    const [owner_user_id, setOwner_user_id] = useState(null); // Id del usuario dueño de la tarjeta
    const [priority, setPriority] = useState(null); // Prioridad de la tarjeta
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
        if (priority === "null") {
            setPriority("3")
        }else{ 
            setPriority(e.target.value);
        }
    };

    const handleOwnerChange = (e) => {
        setOwner_user_id(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        // setDeadline(deadline + "T12:00:00Z");

        const formData = JSON.stringify({
              column_id: backlog_id,
              lane_id: lane_id,
              title: title,
              deadline: deadline,
            //   deadline: "2023-03-30T12:00:00Z",
              owner_user_id: owner_user_id,
              priority: priority
        })
      
        try {
          const response = await fetch("/cards/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: apikey 
            },
            body: formData,
          });
      
          if (response.ok) {
            const data = await response.json();
            window.location.reload();
            console.log("Respuesta del servidor:", data);
            
          } else {
            console.log("Error en la solicitud:", response.status);
            // Maneja el error de acuerdo a tus necesidades
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
          // Maneja el error de acuerdo a tus necesidades
        }
        // console.log("api key: " + apikey)
        // console.log("apikey: " + apikey, "Backlog_id: " + backlog_id, "lane_id: " + lane_id, "title: " + title, "deadline: " + deadline, "owner_user_id: " + owner_user_id, "priority: " + priority)
      };
      

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
            {/* <label>Deadline:</label>
            <input 
                type="date" 
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
            /> */}
            <label>Dueño de tarjeta:</label>
            <select value={owner_user_id} onChange={handleOwnerChange} >
                <option value="null">Seleccione un owner</option>
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