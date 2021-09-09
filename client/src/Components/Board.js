import React from 'react'
import { makeStyles } from '@material-ui/core'

import BoardTitle from './BoardTitle'
import TaskList from './TaskList'

const useStyle = makeStyles({
	'Board': {
		background: '#e0e0e06e',
		margin: '0 16px',
		padding: '8px',
		borderRadius: '4px',
		width: '250px'
	}
})

function Board({ id, title, taskList, draggedID}) {
	const classes = useStyle()

	return (
		<div className={classes['Board']}>
			<BoardTitle title={title} id={id} />
			<TaskList taskList={taskList}  
								boardID={id}
								draggedID={draggedID} />
		</div>
	)
}

export default Board
