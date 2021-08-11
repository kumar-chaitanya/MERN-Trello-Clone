import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/styles'

import { ProjectContext } from '../Contexts/Project.context'
import UpdateInput from './Form-Inputs/UpdateInput'
import DeleteButton from './Buttons/DeleteButton'
import EditButton from './Buttons/EditButton'

const useStyle = makeStyles({
  'BoardTitle': {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '500',
    fontSize: '18px',
    padding: '4px',
    margin: '0 0 4px 0',
    width: '100%',
    '& > span': {
      width: '40px',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }
})

function BoardTitle({ title, id }) {
  const classes = useStyle()
  const [editMode, setEditMode] = useState(false)
  const { updateBoard, deleteBoard } = useContext(ProjectContext)

  const handleDeleteBoard = () => {
    deleteBoard(id)
  }

  const handleEditBoard = () => {
    setEditMode(true)
  }

  const handleCheck = async (title) => {
    const res = await updateBoard(id, title)
    if(res) setEditMode(false)
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  return (
    <>
      {
        !editMode ? <div className={classes['BoardTitle']}>
                      {title}
                      <span>
                        <EditButton onClick={handleEditBoard} />
                        <DeleteButton onClick={handleDeleteBoard} />
                      </span>
                    </div>
        : <UpdateInput value={title} handleCheck={handleCheck} handleCancel={handleCancel} />
      }
    </>
  )
}

export default BoardTitle
