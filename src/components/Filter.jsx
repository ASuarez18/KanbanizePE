import React from "react";
import { useState } from "react";

import "../styles/Filter.css";

const Filter = (users) => {
    const [owner_user_id, setOwner_user_id] = useState(null); // Id del usuario dueño de la tarjeta

    const handleOwnerChange = (e) => {
        setOwner_user_id(e.target.value);
    };
    return (
        <form className="filter-form">
            <label>Owner</label>
            <select value={owner_user_id} onChange={handleOwnerChange} >
            <option value="null">Seleccione un owner</option>
            {users.map((user) => {
            return (
                <option value={user.user_id}>{user.username}</option>
            )
            })}
        </select>
        </form>
        
        
    );

}

export default Filter;