import React from 'react'
import MyNavbar from '../components/navbar';
import WorkflowDetails from '../components/WorkflowDetails';
import Filter from '../components/Filter';
// import imagenes from "./assets/imagenes";
import { useEffect, useState } from 'react';
import Collapsible from '../components/colision';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import i18n from '../components/i18n'
import '../styles/Tablero.css'
import { urlCloud } from '../const';


export const Tablero = ({workflow}) => {
  let apikey = localStorage.getItem('apikey'); // * Se obtiene el apikey del localstorage
  let bID = localStorage.getItem('boardId'); // * Se obtiene el boardId del localstorage
  let dom =localStorage.getItem('dominioid'); 
  // const navigate = useNavigate();
  const { t } = useTranslation();

  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [users, setUsers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [Boardlane, setBoardlane] = useState([]);




  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {

    apikey = localStorage.getItem('apikey');
    dom = localStorage.getItem('dominioid');
    bID = localStorage.getItem('boardId')
    const values = {
      apikey: apikey,
      dom: dom,
      bID: bID
    };


    const fetchColumns = async () => {
      const response = await fetch(`${urlCloud}/columns`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

      const clmns = await response.json();

      if (clmns.response !== 'Invalid apikey') {
        return clmns.data;
      }
    }

    const fetchCards = async () => {
      const response = await fetch(`${urlCloud}/cards`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

      const card = await response.json();
      if (card.response !== 'Invalid apikey') {
        return card.data.data;
      }
    }

    const fetchWorkflows = async () => {
      const response = await fetch(`${urlCloud}/workflows`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
      const wrkflow = await response.json();
      if (wrkflow.response !== 'Invalid apikey') {
        return wrkflow.data;
      }
    }

    const fetchUsers = async () => {
      const response = await fetch(`${urlCloud}/users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
      const usrs = await response.json();
      if (usrs.response !== 'Invalid apikey') {
        return usrs.data;
      }
    }

    const fetchLane = async () => {
      const response = await fetch(`${urlCloud}/lane`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const lanes = await response.json();
      if (lanes.response !== 'Invalid apikey') {
        return lanes.data;
      }
    };

    Promise.all([fetchColumns(), fetchCards(), fetchWorkflows(), fetchLane(), fetchUsers()]).then((allResponses) => {
      setColumns(allResponses[0])
      setCards(allResponses[1])
      setWorkflows(allResponses[2])
      setBoardlane(allResponses[3])
      setUsers(allResponses[4])

      });

    // console.log('lanes\n' + typeof(Boardlane));
    // if (Boardlane.length == 0) {
    //   console.log('Empty');
    // }

  }, []);

  
  let usuarios = [];
  users.map((user) => {
    user.board_roles.map((board_role) => {
      if (board_role.board_id == bID) {
        usuarios.push(user);
      }
    })
  })

  // console.log('Lanes\n' + Boardlane);

  let lanes = [];
  Boardlane.map((data) => {
    if (data.lane_id !== 0) {
      lanes.push(data);
    }
  })

  let backlogs = [];
  columns.map((column) => {
    if (column.name === "Backlog") {
      
      backlogs.push(column);
    }
  })


  let user_id = localStorage.getItem('userID');

  let cardsF = [];
  if (user_id === 'null') {
    cardsF = cards;
  } else {
    cards.map((card) => {
      if (card.owner_user_id == user_id) {
        cardsF.push(card);
      }
    })
  }

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
      { id: 2, title: <div className='tarjeta'>Tarea 2</div> },
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
      <h1>Workflows</h1>
      <div className="filter-container">
        <h4>{t('Filter')}</h4>
        <Filter users={usuarios} />
      </div>
      <div className="workflows-container">
      
        {workflows.map((workflow) => (
          <WorkflowDetails workflow={workflow} columns={columns} Boardlane={Boardlane} cards={cardsF} users={usuarios} backlogs={backlogs} />
        ))}
      </div>

    </div>
  )
}

export default Tablero
