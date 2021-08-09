import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import DeleteButton from './DeleteButton'

const useStyle = makeStyles({
  'ProjectContainer': {
    padding: '24px'
  },
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

function Projects() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState()
  const [inputVal, setinputVal] = useState('')
  const classes = useStyle()

  const handleNewProject = async () => {
    if(!inputVal) return

    try {
      const res = await fetch(`http://localhost:5000/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: inputVal })
      })

      if (res.ok) {
        const project = await res.json()
        setProjects((state) => [...state, {
          id: project._id,
          name: project.name,
          createdAt: project.createdAt
        }])
        setinputVal('')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/projects/${id}`, {
        method: 'DELETE'
      })

      if(res.ok) {
        setProjects((state) => {
          state = [...state]
          state.splice(state.findIndex(project => project.id === id), 1)
          return [...state]
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => {
        data = data.projects.map(project => {
          return {
            id: project._id,
            name: project.name,
            createdAt: project.createdAt
          }
        })
        setProjects(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  let data = <div>Loading Your Projects......</div>

  if (!loading) {
    data = <>
      {projects.map(project => {
        return (
          <Grid item lg={3} key={project.id}>
            <Card className={classes['Project']}>
              <CardContent>
                <Typography className={classes['ProjectTitle']} variant="h6">
                  {project.name}
                  <DeleteButton onClick={() => handleDeleteProject(project.id)} />
                </Typography>
                <Typography style={{ fontSize: '12px' }} variant="h6" color="textSecondary">
                  Created On: {(new Date(project.createdAt)).toDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant='contained' color='primary'>
                  <Link style={{ textDecoration: 'none', fontSize: '10px', color: 'white' }} to={`/projects/${project.id}`}>
                    See Project
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
      <Grid item lg={3}>
        <input type="text" value={inputVal} onChange={(e) => setinputVal(e.target.value)} placeholder='Project Name' />
        <button onClick={handleNewProject}>Create Project</button>
      </Grid>
    </>
  }

  return (
    <Grid className={classes['ProjectContainer']} container spacing={4}>
      {data}
    </Grid>
  )
}

export default Projects