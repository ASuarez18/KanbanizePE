import React from 'react'
import "./Tablero.css"
// import imagenes from "./assets/imagenes";
import { useEffect, useState } from 'react';

import WorkspaceDetails from './WorkspaceDetails';


export const Home = (props) => {
  const apikey = localStorage.getItem('apikey');
  // const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [boards, setBoards] = useState(null);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const values = {
  //     apikey: apikey
  //   };
  //   console.log(values);

  //   const response = await fetch(`http://localhost:3013/workspaces`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(values)
  //   });

  //   const wspc = await response.json();

  //   if (wspc.response !== 'Invalid apikey'){
  //     setWorkspace(wspc);
  //   }else{
  //     // Mostrar error
  //   }

  //   const response2 = await fetch(`http://localhost:3013/boards`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(values)
  //   });

  //   const brds = await response2.json();

  //   if (brds.response !== 'Invalid apikey'){
  //     setBoards(brds);
  //   }else{
  //     // Mostrar error
  //   }

  //   console.log(workspace);
  //   // console.log(boards);
  // }

  useEffect(() => {
    const values = {
      apikey: apikey
    };
    console.log(values);

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

      if (wspc.response !== 'Invalid apikey'){
        setWorkspace(wspc);
      }else{
        // Mostrar error
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

      if (brds.response !== 'Invalid apikey'){
        setBoards(brds);
      }else{
        // Mostrar error
      }
    }
    fetchBoards();
    fetchWorkspace();

    console.log(workspace);
  }, []); 
  // //* Fetching Workspaces
  // useEffect(() => {
  //   const fetchWorkspace = async () => {
  //     const response = await fetch('http://localhost:3013/workspaces');
  //     const json = await response.json();

  //     if (response.ok) {
  //       setWorkspace(json);
  //     }
  //   }
  //   fetchWorkspace();
  // }, []);

  // //* Fetching Boards
  // useEffect(() => {
  //   const fetchBoards = async () => {
  //     const response = await fetch('http://localhost:3013/boards');
  //     const json = await response.json();

  //     if (response.ok) {
  //       setBoards(json);
  //     }
  //   }
  //   fetchBoards();
  // })

  return (
    <div >
      {/* <img src={imagenes.img3}/> */}
      <div className="home">
        {/* <form onSubmit={handleSubmit}>
          <button type="submit">Cargar</button>
        </form> */}
        <div className="workspaces-container">
          {/* {workspace && workspace.map((workspace) => (
            <WorkspaceDetails key={workspace.workspace_id} workspace={workspace} boards={boards}/>
          ))}  */}
        
        </div>
      </div>
    </div>
  )
}

export default Home