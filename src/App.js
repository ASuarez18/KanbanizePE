import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Tablero } from "./Pages/Tablero";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/tablero" element={<Tablero />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
