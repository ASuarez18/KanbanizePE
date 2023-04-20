
//! Mostrar workspaces
const WorkspaceDetails =  ({ workspace, boards }) => {
    return(
        <div className="workspaces-container">
            <h4>{workspace.name}</h4> {/* Nombre del workspace en la parte superior */}
            <div className="boards-container">
                {/* Mapeo de tableros segun la cantidad de objetos obtenidos en la variable boards */}
                {
                boards.map((board) => {
                    //* Validación de el tablero corresponda al workspace
                    if (board.workspace_id === workspace.workspace_id){
                        //* Mostrar los detalles del tablero por medio de un nuevo componente
                        return (<div key={board.board_id}>{board.name}</div>)
                    }
                })}
            </div>
        </div>
    )
}

export default WorkspaceDetails;