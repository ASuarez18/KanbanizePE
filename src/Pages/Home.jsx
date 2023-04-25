import React from 'react'
import "../design/Tablero.css"
import MyNavbar from '../components/navbar';
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
      const response = await fetch(`https://8e7469xqji.execute-api.us-east-1.amazonaws.com/workspaces`,
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
      const response = await fetch(`https://8e7469xqji.execute-api.us-east-1.amazonaws.com/boards`,
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

    Promise.all([fetchWorkspace(), fetchBoards()])
      .then(() => console.log("Both fetches completed!"))
      .catch((error) => console.log("Error fetching data: ", error));

  }, []);


  return (
    <div >
      <div >
        <MyNavbar />
      </div>
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
