import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'

import DeleteButton from './DeleteButton'

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
    fontSize: '18px'
  }
})

export default function ProjectInfo({ name, id, createdAt, handleDeleteProject }) {
  const classes = useStyle()

  return (
    <Grid item lg={3}>
      <Card className={classes['Project']}>
        <CardContent>
          <Typography className={classes['ProjectTitle']} variant="h6">
            {name}
            <DeleteButton onClick={() => handleDeleteProject(id)} />
          </Typography>
          <Typography style={{ fontSize: '12px' }} variant="h6" color="textSecondary">
            Created On: {(new Date(createdAt)).toDateString()}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant='contained' color='primary'>
            <Link style={{ textDecoration: 'none', fontSize: '10px', color: 'white' }} to={`/projects/${id}`}>
              See Project
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}