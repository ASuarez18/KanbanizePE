const BoardDetails = ({ board }) => {
    return(
        <div className="board-details">
            {/* Mostrar el nombre del tablero */}
            <p><strong>{board.name}</strong></p>
        </div>       
    )
}

export default BoardDetails;