import React from 'react'
import BoardTitle from './BoardTitle'
import TaskList from './TaskList'
import '../Board.css'

function Board({addNewTask, id, title, taskList, handleDragStart, handleDragEnter, handleDragOver, handleDragEnd, isDragging, draggedID}) {
	return (
		<div className="Board">
			<BoardTitle title={title} />
			<TaskList taskList={taskList}  
								boardID={id}
								isDragging={isDragging}
								draggedID={draggedID}
								handleDragStart={handleDragStart}
								handleDragEnter={handleDragEnter}
								handleDragOver={handleDragOver}
								handleDragEnd={handleDragEnd}
								addNewTask={addNewTask} />
		</div>
	)
}

export default Board
