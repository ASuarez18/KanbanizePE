import React from 'react'
import "../design/Tablero.css"
import MyNavbar from '../components/navbar';
import WorkflowDetails from '../components/WorkflowDetails';
// import imagenes from "./assets/imagenes";
import { useEffect, useState } from 'react';
import Collapsible from '../components/colision';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import '../design/Tablero.css'

import Train from './Train';


export const Tablero = (props) => {
  let apikey = localStorage.getItem('apikey'); // * Se obtiene el apikey del localstorage
  let b_ID = localStorage.getItem('boardId'); // * Se obtiene el boardId del localstorage
  // const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [users, setUsers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    
    apikey = localStorage.getItem('apikey');
    b_ID = localStorage.getItem('boardId')
    const values = {
      apikey: apikey,
      b_ID: b_ID  
    };
    

    const fetchColumns = async () => {
      const response = await fetch(`/columns`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

      const clmns = await response.json();

      if (clmns.response !== 'Invalid apikey') {
        setColumns(clmns.data);
      }
    }

    const fetchCards = async () => {
      const response = await fetch(`/cards`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

      const card = await response.json();
      if (card.response !== 'Invalid apikey') {
        setCards(card.data.data);
      }
    }

    const fetchWorkflows = async () => {
      const response = await fetch(`/workflows`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const wrkflow = await response.json();
      if (wrkflow.response !== 'Invalid apikey') {
        setWorkflows(wrkflow.data);
      }
    }

    const fetchUsers = async () => {
      const response = await fetch(`/users`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const usrs = await response.json();
      if (usrs.response !== 'Invalid apikey') {
        setUsers(usrs.data);
      }
    }

    Promise.all([fetchColumns(), fetchCards()], fetchWorkflows(), fetchUsers())
      .then(() => console.log("All fetches completed!"))
      .catch((error) => console.log("Error fetching data: ", error));

  }, []);

  //TODO: Validar ID del usuario dado el nombre de usuario/dropdown
  let usuarios = [];
  users.map((user) => {
      user.board_roles.map((board_role) => {
          if (board_role.board_id == b_ID) {
              usuarios.push(user);
          }
      })
  })

  let backlogs = [];
  columns.map((column) => {
    if (column.name === "Backlog") {
        backlogs.push(column);
    }
})



  function Carousel({ items }) {
    const [currentItem, setCurrentItem] = useState(0);
  
    const handlePrevClick = () => {
      setCurrentItem(currentItem === 0 ? items.length - 1 : currentItem - 1);
    };
  
    const handleNextClick = () => {
      setCurrentItem(currentItem === items.length - 1 ? 0 : currentItem + 1);
    };
  
    return (
        <div>
        <h3>{items[currentItem].title}</h3>
        <button onClick={handlePrevClick}>
          <FaChevronLeft />
        </button>
        <button onClick={handleNextClick}>
          <FaChevronRight />
        </button>
      </div>
    );
  }
  
  function Componente11() {
    const [items, setItems] = useState([
      { id: 1, title: <div className='tarjeta'>Tarea 1</div> },
      { id: 2, title: <div className='tarjeta'>Tarea 2</div>},
    ]);
  
    return (
      <div>
        <Carousel items={items} />
      </div>
    );
  }
  return (
    <div >
        <MyNavbar />
        <h1>.</h1>
        <h1>Workflows</h1>
        <div className="workflows-container">
          {/* Mapeo de workflows usando un componente */}
          {workflows.map((workflow) => ( 
            <WorkflowDetails workflow={workflow} columns={columns} cards={cards} users={usuarios} backlogs={backlogs} />
          ))}
        </div>
        {/* <div className='bigone'>
          <Collapsible header="INITIATIVES WORKFLOW">
        <div>
          <Collapsible title="Componente 1.1" header="Backlog">
            <div className='compon'>
              <Componente11 />
            </div>
          </Collapsible>
          <Collapsible title="Componente 1.1"  header="Request">
            <div >
              <Componente11 />
            </div>
          </Collapsible>
          <Collapsible title="Componente 1.1"  header="In progress">
            <div>
              <Componente11 />
            </div>
          </Collapsible>
          <Collapsible title="Componente 1.1"  header="Done">
            <div>
              <Componente11 />
          </div>
        </Collapsible>
      </div>
          </Collapsible>
            </div> */}
    </div>
  )
}

export default Tablero
