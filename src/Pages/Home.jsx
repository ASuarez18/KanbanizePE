import React from 'react'
import "../design/Tablero.css"
// import imagenes from "./assets/imagenes";
import { useEffect, useState } from 'react';

import WorkspaceDetails from './WorkspaceDetails';


export const Home = (props) => {
  let apikey = localStorage.getItem('apikey');
  // const navigate = useNavigate();
  const [workspace, setWorkspace] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    apikey = localStorage.getItem('apikey');
    const values = {
      apikey: apikey
    };

    const fetchWorkspace = async () => {
      const response = await fetch(`http://localhost:3013/workspaces`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

      const wspc = await response.json();

      if (wspc.response !== 'Invalid apikey') {
        setWorkspace(wspc.data);
      }
    }

    const fetchBoards = async () => {
      const response = await fetch(`http://localhost:3013/boards`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

      const brds = await response.json();
      if (brds.response !== 'Invalid apikey') {
        setBoards(brds.data);
      }
    }

    fetchBoards()
    fetchWorkspace()
  }, []);


  return (
    <div >
      {/* <img src={imagenes.img3}/> */}
      <div className="home">
        <div className="workspaces-container">
          { workspace && workspace.map((workspace) => (
            <WorkspaceDetails key={workspace.workspace_id} workspace={workspace} boards={boards}/>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Home