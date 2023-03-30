import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import './Login.css'
import imagenes from "./assets/imagenes";


export const Login = (props) => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const values = {
            email: email,
            pass: pass
        };
        console.log(values);

        const response = await fetch(`http://localhost:3013/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

        const data = await response.json();

        if (data.response === 'Invalid email or password.') {
            setModalShow(true);
        }
        else {
            localStorage.setItem('apikey', data.apikey);
            navigate('/tablero');
        }

        console.log(data);
    }
   
    return (
        <div className="login-container">
            <h1>BIENVENIDO A:</h1>
            <img src={imagenes.img2}/>
            <form className="login-form" onSubmit={handleSubmit}>

                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Correo Electronico" id="email" name="email" />
     
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Contraseña" id="pass" name="pass" />
                <button type="submit">INICIAR SESIÓN</button>
            </form>
            <ErrorModal show={modalShow} message='Usuario o contraseña incorrectos' onHide={() => setModalShow(false)} />
        </div>
    )
}