import React from 'react'
import BoardTitle from './BoardTitle'
import TaskList from './TaskList'
import '../Board.css'

function Board({addNewTask, id, title, taskList, moveTask}) {
	return (
		<div className="Board">
			<BoardTitle title={title} />
			<TaskList taskList={taskList} moveTask={moveTask} boardID={id} addNewTask={addNewTask} />
		</div>
	)
}

export default Board
