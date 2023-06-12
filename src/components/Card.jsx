import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import "../styles/Tablero.css";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Card = ({ card, users, workflow, backlogs}) => {
  let apikey = localStorage.getItem('apikey');
  let dom = localStorage.getItem('dominioid');

  const url = "https://8e7469xqji.execute-api.us-east-1.amazonaws.com";

  const {t} = useTranslation();
  const [column_id, setColumn_id] = useState(card.column_id); // Id de la columna
  const [cardid, setCard_id] = useState(card.card_id); // Id de la tarjeta
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  const [attachment, setAttachment] = useState(null);
  const values = {apikey: apikey, dom: dom, cardid: cardid};

  const handleCommentClick = async(e) => {

    e.preventDefault();
    try {
      const response = await fetch(`${url}/cards/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apikey,
          cardid: cardid
        },
        body: JSON.stringify(values)
      });
      const comments = await response.json();
      if (response.ok) {
        setComments(comments.data);
        setShowCommentModal(true);
      }
    } catch (error) {
      console.log(error.message);
      console.log(cardid);
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
        setComment('');
        
        setShowCommentModal(false);
      }
    } catch (error) {
      console.log(error.message);

    }

    
    // Handle submitting the comment
    // You can make an API call or update the state accordingly

  };

  let comentariosautor = [];
  comments.map((author) => {
    if (comments.author !== "") {
      comentariosautor.push(author);
    }

  });

  let comentariouser = [];
  comentariosautor.map((value) => {
    if (comentariosautor.value !== ""){
      comentariouser.push(value);
    }

  });

  let comentarios = [];
  comments.map((text) => {
    if (comments.text !== "") {
      
      comentarios.push(text);
    }
  })
  
  
  const handleAttachmentChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleAttachmentSubmit = async (e) => {
    e.preventDefault();
    const attachmentData = new FormData();
    attachmentData.append('archivo', selectedFile);

    try{
      const response = await fetch(`${url}/cards/comments/attachments`, {
        method: "POST",
        headers: {
          apikey: apikey,
          cardid: cardid,
          dom: dom,
        },
        body: attachmentData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Submitted attachment:', data);
        setAttachment('');
        setShowCommentModal(false); //! Posible cambio para notificar que se realizó la acción
      } else {
        console.log('Error submitting attachment', response.status, response.statusText);
      }
    }catch(error){
      console.log(error.message);
    }
  }

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
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
          return <p><strong>{t('Owner: ')}</strong> {user.realname}</p>
        }
      })
      }

      <p>
        <strong>{t('Priority: ')}</strong>
        {
          card.priority === 1 ? <span className="low-priority"> {t('Low')}</span> :
            card.priority === 2 ? <span className="medium-priority"> {t('Avarage')}</span> :
              card.priority === 3 ? <span className="average-priority"> {t('High')}</span> :
                card.priority === 4 ? <span className="critical-priority"> {t('Critical')}</span> :
                  card.priority === null ? <span className="low-priority"> {t('Low')}</span> : null //TODO: Revisar
        }
      </p>
      {/* Deadline dependiente de si tiene o no tiene */}
      {card.deadline === null ? <p><strong>{t('Deadline: ')}</strong> {t('No Deadline')}</p> : <p><strong>{t('Deadline')}</strong> {(card.deadline).substring(0, 10)}</p>}
      {/*<p>Id tarjeta: {card.card_id}</p>
      <p>Id columna: {card.column_id}</p>*/}
       <p>
        <button onClick={handleCommentClick}>{t('Comments')}</button>
      </p>
      <p>
        <button onClick={handleMoveNext}>{t('Move')}</button>
      </p>



      <Modal
        isOpen={showCommentModal}
        onRequestClose={() => setShowCommentModal(false)}
        contentLabel="Comment Modal"
      >
        <form onSubmit={handleCommentSubmit} className='CommentForm'>
        {users.map((user) => { // * Mapeo de usuarios
        if (user.user_id ===comentariouser.value) { //* Validar si el usuario es dueño de la tarjeta
          // * Mostrar nombre de usuario
          return <p><strong>{t('Owner: ')}</strong> {user.realname}</p>
        }
      })
      }
          <p className='titleComment' >{t('Comments')}</p>  
          {comentarios.map((text) => {
            return <p>- {text.text} </p>
          })}
            
          <p>{t('Enter comment: ')}</p>  

          <textarea
            placeholder="Comment"

            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className = 'CommentBotton' >
          <button className ='buttonCLOSE' onClick={handleCloseCommentModal}>{t('Close ')}<FontAwesomeIcon icon={faTimes} /></button>
           <button className ='buttonEdits' type="submit">{t('Send')} <FontAwesomeIcon icon={faPaperPlane} /></button>
          

           

          </div>

        </form>
        {/* <form method='POST' action="${url}/cards/comments/attachments" enctype="multipart/form-data"> */}
        <form onSubmit={handleAttachmentSubmit}>
          {
            // TODO: Cambiar textos para localización
          }
          <p>Adjuntar archivo</p>
          <input type="file" onChange={handleAttachmentChange} name="file" />
          <input type="submit" value="Enviar" />
        </form>
      </Modal>
    </div>
  );
};

export default Card;
