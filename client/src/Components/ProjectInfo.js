import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'

import UpdateInput from './Form-Inputs/UpdateInput'
import DeleteButton from './Buttons/DeleteButton'
import EditButton from './Buttons/EditButton'

const useStyle = makeStyles({
  'Project': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '16px',
    height: '200px'
  },
  'ProjectTitle': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
    '& > span': {
      width: '40px',
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  Button: {
    background: 'linear-gradient(90deg, rgba(46,0,86,0.919502835313813) 0%, rgba(116,9,121,0.9363095580028886) 50%, rgba(137,0,200,0.919502835313813) 100%)'
  }
})

export default function ProjectInfo({ name, id, createdAt, handleUpdateProject, handleDeleteProject }) {
  const [editMode, setEditMode] = useState(false)
  const classes = useStyle()

  const handleEditProject = () => {
    setEditMode(true)
  }

  const handleCheck = async (name) => {
    const res = await handleUpdateProject(id, name)
    if(res) setEditMode(false)
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  return (
    <Grid item lg={3}>
      <Card className={classes['Project']}>
        <CardContent>
          {
            !editMode ? <Typography className={classes['ProjectTitle']} variant="h6">
                        {name}
                        <span>
                          <EditButton onClick={handleEditProject} />
                          <DeleteButton onClick={() => handleDeleteProject(id)} />
                        </span>
                       </Typography>
                       : <UpdateInput value={name} handleCheck={handleCheck} handleCancel={handleCancel} />
          }
          <Typography style={{ fontSize: '12px' }} variant="h6" color="textSecondary">
            Created On: {(new Date(createdAt)).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' color='primary' className={classes['Button']}>
            <Link style={{ textDecoration: 'none', fontSize: '10px', color: 'white' }} to={`/projects/${id}`}>
              See Project
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}