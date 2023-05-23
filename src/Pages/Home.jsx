import React from 'react'
import MyNavbar from '../components/navbar';
import { useEffect, useState } from 'react';
import "../styles/Home.css";
import WorkspaceDetails from '../components/WorkspaceDetails';


export const Home = (props) => {
  let apikey = localStorage.getItem('apikey'); //* Se obtiene el apikey del localstorage
  // const navigate = useNavigate();
  const [workspace, setWorkspace] = useState([]);
  const [boards, setBoards] = useState([]);
  localStorage.setItem('userID', null)


  useEffect(() => { //* Se ejecuta al cargar la pagina

    apikey = localStorage.getItem('apikey');
    const values = {
      apikey: apikey
    };


    const fetchWorkspace = async () => { // * Se obtienen los workspaces
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

    const fetchBoards = async () => { // * Se obtienen los boards
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

  }, []);


  return (
    <div >
      <div >
        <MyNavbar />
      </div>
      <div className="home">
        <div className="workspaces-container">
          {workspace && workspace.map((workspace) => (
            <WorkspaceDetails key={workspace.workspace_id} workspace={workspace} boards={boards} />
          ))}

        </div>
      </div>
    </div>
  )
}

export default Home
