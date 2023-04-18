import React from 'react'
import "./Tablero.css"
// import imagenes from "./assets/imagenes";
import { useEffect, useState } from 'react';

import WorkspaceDetails from './WorkspaceDetails';


export const Home = (props) => {
  const [workspace, setWorkspace] = useState(null);
  const [boards, setBoards] = useState(null);

  //* Fetching Workspaces
  useEffect(() => {
    const fetchWorkspace = async () => {
      const response = await fetch('http://localhost:3013/workspaces');
      const json = await response.json();

      if (response.ok) {
        setWorkspace(json);
      }
    }
    fetchWorkspace();
  }, []);

  //* Fetching Boards
  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch('http://localhost:3013/boards');
      const json = await response.json();

      if (response.ok) {
        setBoards(json);
      }
    }
    fetchBoards();
  })

  return (
    <div >
      {/* <img src={imagenes.img3}/> */}
      <div className="home">
        <div className="workspaces-container">
          {workspace && workspace.map((workspace) => (
            <WorkspaceDetails key={workspace.workspace_id} workspace={workspace} boards={boards}/>
          ))} 
        </div>
      </div>
    </div>
  )
}

export default Home