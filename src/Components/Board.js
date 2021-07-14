import React from 'react'
import BoardTitle from './BoardTitle'
import TaskList from './TaskList'
import '../Board.css'

function Board({title, taskList}) {
	return (
		<div className="Board">
			<BoardTitle title={title} />
			<TaskList taskList={taskList} />
		</div>
	)
}

export default Board
