import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import ProjectInfo from './ProjectInfo'
import AddInput from './AddInput'

const useStyle = makeStyles({
  'ProjectContainer': {
    padding: '24px'
  }
})

function Projects() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState()
  const classes = useStyle()

  const handleNewProject = async (inputVal) => {
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
      {projects.map(project => <ProjectInfo {...project} handleDeleteProject={handleDeleteProject} />)}
      <Grid item lg={3}>
        <AddInput placeholder="Enter Project Name" btnText="Create" btnClick={handleNewProject} />
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