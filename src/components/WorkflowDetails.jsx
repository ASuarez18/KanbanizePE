import React from 'react';
import Card from './Card';
import CardForm from './CardForm';
import "../styles/Tablero.css";


const WorkflowDetails = ({ workflow, columns, Boardlane, cards, users, backlogs }) => {
	return (
		<div className="workflow-details">
			{/* Nombre de workflow */}
			<h2>{workflow.name}</h2>
			<CardForm workflow={workflow} columns={columns} users={users} Boardlane={Boardlane} backlogs={backlogs} />
			<div className="columns-container">
				{/* Mapeo de columnas */}
				{columns.map((column) => {
					if (column.workflow_id === workflow.workflow_id) { //* Validar si la columna pertenece al workflow actual
						if (column.parent_column_id === null) { //* Validar si la columna no es padre
							return (
								<div className="column-details">
									{/* Nombre de la columna */}
									<h5>{column.name}</h5>
									<div className="cards-container">
										{cards.map((card) => { // * Mapeo de tarjetas
											if (card.column_id === column.column_id && card.workflow_id === workflow.workflow_id) { //* Validar si la tarjeta pertenece a la columna y al workflow actual
												return (
													<Card card={card} users={users} />
												)
											}
										})}
									</div>
								</div>
							)
						} else { //* Si la columna es padre
							return (
								<div className="column-child-details">
									{/* Nombre de la columna */}
									<h5>{column.name}</h5>
									<div className="cards-container">
										{cards.map((card) => { // * Mapeo de tarjetas
											if (card.column_id === column.column_id && card.workflow_id === workflow.workflow_id) { //* Validar si la tarjeta pertenece a la columna y al workflow actual
												return (
													<Card card={card} users={users} />
												)
											}
										})}
									</div>
								</div>
							)
						}
					}
				})}
			</div>
		</div>
	)
}

export default WorkflowDetails;