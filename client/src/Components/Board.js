import React from 'react'
import BoardTitle from './BoardTitle'
import TaskList from './TaskList'
import '../Board.css'

function Board({ id, title, taskList, draggedID}) {
	return (
		<div className="Board">
			<BoardTitle title={title} />
			<TaskList taskList={taskList}  
								boardID={id}
								draggedID={draggedID} />
		</div>
	)
}

export default Board
