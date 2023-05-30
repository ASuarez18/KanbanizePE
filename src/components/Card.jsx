import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import "../styles/Tablero.css";
import Modal from 'react-modal';

const Card = ({ card, users, workflow, backlogs}) => {
  let apikey = localStorage.getItem('apikey');
  let dom = localStorage.getItem('dominioid');

  const url = "https://8e7469xqji.execute-api.us-east-1.amazonaws.com";

  const {t} = useTranslation();
  const [column_id, setColumn_id] = useState(card.column_id); // Id de la columna
  const [cardid, setCard_id] = useState(card.card_id); // Id de la tarjeta

  
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');

  const handleCommentClick = async(e) => {

    e.preventDefault();

    try {
      const response = await fetch(`${url}/cards/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: apikey,
          dom: dom,
          cardid: cardid,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const texton = data;
        console.log(data);

        setShowCommentModal(true);
      }
    } catch (error) {
      console.log(error.message);
    }

  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const formData = JSON.stringify({
      text: comment,
    })

    try {
      const response = await fetch(`${url}/cards/comments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apikey,
          dom: dom,
          cardid: cardid,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Submitted comment:', comment);
        // Reset the comment state and close the modal
        setComment('');
        setShowCommentModal(false);
      }
    } catch (error) {
      console.log(error.message);

    }

    
    // Handle submitting the comment
    // You can make an API call or update the state accordingly

  };

  const handleMoveNext =async (e) => {
    e.preventDefault(); 

    const formData = JSON.stringify({
      column_id: column_id + 1,
    })

    try {
      const response = await fetch(`${url}/cards/move`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: apikey,
          dom: dom,
          cardid: cardid,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(column_id);

        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
      console.log(column_id);
    }
  };

  return (
    <div className="card-details">
      {/* Nombre de tarjeta */}
      <strong>{card.title}</strong>
      {users.map((user) => { // * Mapeo de usuarios
        if (user.user_id === card.owner_user_id) { //* Validar si el usuario es dueño de la tarjeta
          // * Mostrar nombre de usuario
          return <p><strong>Owner:</strong> {user.realname}</p>
        }
      })
      }

      <p>
        <strong>Priority:</strong>
        {
          card.priority === 1 ? <span className="low-priority"> Baja</span> :
            card.priority === 2 ? <span className="medium-priority"> Alta</span> :
              card.priority === 3 ? <span className="average-priority"> Promedio</span> :
                card.priority === 4 ? <span className="low-priority"> Baja</span> :
                  card.priority === null ? <span className="low-priority"> Promedio</span> : null //TODO: Revisar
        }
      </p>
      {/* Deadline dependiente de si tiene o no tiene */}
      {card.deadline === null ? <p><strong>Deadline:</strong> Sin deadline</p> : <p><strong>Deadline:</strong> {(card.deadline).substring(0, 10)}</p>}
      {/*<p>Id tarjeta: {card.card_id}</p>
      <p>Id columna: {card.column_id}</p>*/}
       <p>
        <button onClick={handleCommentClick}>Comentar</button>
      </p>
      <p>
        <button onClick={handleMoveNext}>Next</button>
      </p>

      <Modal
        isOpen={showCommentModal}
        onRequestClose={() => setShowCommentModal(false)}
        contentLabel="Comment Modal"
      >
        <form onSubmit={handleCommentSubmit}>
          <p>Introduce a comment:</p>
          <textarea
            placeholder="Enter your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default Card;
