import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/styles'

import { ProjectContext } from '../Contexts/Project.context'
import DeleteButton from './DeleteButton'

const useStyle = makeStyles({
  'BoardTitle': {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '500',
    fontSize: '18px',
    padding: '4px',
    margin: '0 0 4px 0',
    width: '100%'
  }
})

function BoardTitle({ title, id }) {
  const classes = useStyle()
  const { deleteBoard } = useContext(ProjectContext)

  const handleDeleteBoard = () => {
    deleteBoard(id)
  }

  return (
    <div className={classes['BoardTitle']}>
      {title}
      <DeleteButton onClick={handleDeleteBoard} />
    </div>
  )
}

export default BoardTitle
