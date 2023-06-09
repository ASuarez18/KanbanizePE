import { useState } from "react";
import { useTranslation } from 'react-i18next';
import '../styles/CardForm.css'

const CardForm = ({ workflow, columns, users, backlogs }) => {
  let apikey = localStorage.getItem('apikey');
  let dom = localStorage.getItem('dominioid');
  let backlog_id = 0;
  const {t} = useTranslation();
  const [lane_id, setLane_id] = useState(workflow.workflow_id); // Id del workflow
  const [title, setTitle] = useState(""); // Título de la tarjeta
  const [deadline, setDeadline] = useState(null); // Fecha límite de la tarjeta //TODO: Arreglar e implementar datepicke
  const [owner_user_id, setOwner_user_id] = useState(null); // Id del usuario dueño de la tarjeta
  const [priority, setPriority] = useState(null); // Prioridad de la tarjeta
  // let backlogs = [];

  const [error, setError] = useState(null); // Error de validación


  backlogs.map((backlog) => {
    if (backlog.workflow_id === workflow.workflow_id) {
      backlog_id = backlog.column_id;
    }
  })

  const handlePriorityChange = (e) => {
    if (priority === "null") {
      setPriority("3")
    } else {
      setPriority(e.target.value);
    }
  };

  const handleOwnerChange = (e) => {
    setOwner_user_id(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    let deadlineDate = deadline.toString() + "T12:00:00Z";

    const formData = JSON.stringify({
      column_id: backlog_id,
      lane_id: lane_id,
      title: title,
      deadline: deadlineDate,
      owner_user_id: owner_user_id,
      priority: priority
    })

    try {
      const response = await fetch("https://8e7469xqji.execute-api.us-east-1.amazonaws.com/cards/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apikey,
          dom: dom,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        window.location.reload();
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h5>{t('Create Card')}</h5>
      <h6>Backlog_ID {backlog_id}</h6>
      <label>{t('Card Title: ')}</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>{t('Deadline: ')}</label>
      <input
        type="date"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
      />
      <label>{t('Card Owner: ')}</label>
      <select value={owner_user_id} onChange={handleOwnerChange} >
        <option value="null">{t('Select Owner')}</option>
        {users.map((user) => {
          return (
            <option value={user.user_id}>{user.username}</option>
          )
        })}
      </select>
      <label>{t('Priority: ')}</label>
      <select value={priority} onChange={handlePriorityChange}>
        <option value="null">{t('Select priority')}</option>
        <option value="1">{t('Low')}</option>
        <option value="2">{t('Avarage')}</option>
        <option value="3">{t('Medium')}</option>
        <option value="4">{t('Critical')}</option>
      </select>
      <button>{t('Create Card')}</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default CardForm;