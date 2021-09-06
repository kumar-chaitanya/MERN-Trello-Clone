import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'

import { ProjectContext } from '../Contexts/Project.context'
import Board from './Board'
import Error from './Error'
import AddInput from './Form-Inputs/AddInput'
import Loader from './Loader'

const useStyles = makeStyles({
  Project: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    padding: '24px',
    '& > div': {
      flex: '0 0 auto'
    }
  }
})


function Project() {
  const classes = useStyles()
  const { project, dragged, isDragging, addNewBoard } = useContext(ProjectContext)

  let data = null
  if (project.loading) {
    data = <Loader />
  } else if(project.projectId) {
    data = <div className={classes['Project']}>
      {project.boards.map(board => <Board
        key={board.id}
        {...board}
        draggedID={isDragging && dragged.current.taskID}
        isDragging={isDragging} />)
      }
      <AddInput placeholder="Enter Board Title" btnText="Create" btnClick={addNewBoard} />
    </div>
  }
  return (
    <>
      {project.error && <Error message={project.error} />}
      {data}
    </>
  )
}

export default Project
