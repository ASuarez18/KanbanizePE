import React from 'react';
import "../styles/WorkspaceDetails.css";

import { useNavigate } from 'react-router-dom';


const WorkspaceDetails = ({ workspace, boards }) => {
  const navigate = useNavigate();

  return (
    <div className="workspace-details-container">
      <h4>{workspace.name}</h4>
      <div className="canva">
        <div className="boards-container">
          {boards.map((board) => {
            if (board.workspace_id === workspace.workspace_id) {

              const handleClick = () => {
                localStorage.setItem('boardId', board.board_id); // * Se guarda el boardId en el localStorage
                navigate(`/tablero`);
              };
              return (
                <div key={board.board_id}>
                  <button type="button" className="button" onClick={handleClick}>
                    {board.name}
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDetails;
