import React from "react";
import { useState } from "react";

import "../styles/Filter.css";

const Filter = (users) => {
    const [owner_user_id, setOwner_user_id] = useState(null); // Id del usuario dueño de la tarjeta

    const handleOwnerChange = (e) => {
        setOwner_user_id(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (owner_user_id === "null") {
            localStorage.setItem("userID", null);
        } else {
            localStorage.setItem("userID", owner_user_id);
            window.location.reload();
        }
        // console.log("UserID " + owner_user_id);
    };

    return (
        <form className="filter-form" onSubmit={handleSubmit} >
            <label>Owner</label>
            <select value={owner_user_id} onChange={handleOwnerChange} >
            <option value="null">Seleccione un owner</option>
            {users.users.map((user) => {
                    return (
                        <option value={user.user_id}>{user.username}</option>
                    )
            })}
        </select>
        <button>Filtrar</button>
        </form>
        
        
    );

}

export default Filter;