import React from 'react'
import "../design/Tablero.css"
import MyNavbar from '../components/navbar';
// import imagenes from "./assets/imagenes";
import { useEffect, useState } from 'react';
import Collapsible from '../components/colision';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";



import Train from './Train';


export const Tablero = (props) => {
  let apikey = localStorage.getItem('apikey');
  let b_ID = localStorage.getItem('boardId');
  // const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
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
      const response = await fetch(`https://8e7469xqji.execute-api.us-east-1.amazonaws.com/columns`,
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
      const response = await fetch(`https://8e7469xqji.execute-api.us-east-1.amazonaws.com/cards`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

      const cart = await response.json();
      if (cart.response !== 'Invalid apikey') {
        setCards(cart.data);
      }
    }

    Promise.all([fetchColumns(), fetchCards()])
      .then(() => console.log("Both fetches completed!"))
      .catch((error) => console.log("Error fetching data: ", error));

  }, []);

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
        <div className='bigone'>
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
            </div>
    </div>
  )
}

export default Tablero
