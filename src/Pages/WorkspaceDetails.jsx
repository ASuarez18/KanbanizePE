import React from 'react';
import "../design/WorkspaceDetails.css";
import { Link } from 'react-router-dom';

const WorkspaceDetails = ({ workspace, boards }) => {
  return (
    <div className="workspace-details-container">
      <h4>{workspace.name}</h4>
      <div className="boards-container">
        {boards.map((board) => {
          if (board.workspace_id === workspace.workspace_id) {
            return (
              <div key={board.board_id}>
                <Link to={`/board/${board.board_id}`}>
                  {board.name}
                </Link>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default WorkspaceDetails;
