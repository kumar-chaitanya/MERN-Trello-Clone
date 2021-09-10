import React, { useState, useEffect, useContext } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import { isProtected } from '../hoc/isProtected'
import ProjectInfo from './ProjectInfo'
import AddInput from './Form-Inputs/AddInput'
import { AuthContext } from '../Contexts/Auth.context'
import Loader from './Loader'
import Error from './Error'

const useStyle = makeStyles({
  'ProjectContainer': {
    padding: '24px',
    width: '100%',
    height: '100%'
  }
})

function Projects() {
  const { authToken } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState()
  const [error, setError] = useState('')
  const classes = useStyle()

  const handleError = (errorMsg) => {
    setError(errorMsg)
    setTimeout(() => {
      setError('')
    }, 4000);
  }

  const handleNewProject = async (inputVal) => {
    if (!inputVal) return

    try {
      const res = await fetch(`/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ name: inputVal })
      })

      const data = await res.json()
      if (res.ok) {
        setProjects((state) => [...state, {
          id: data._id,
          name: data.name,
          createdAt: data.createdAt
        }])
      } else {
        handleError(data.message)
      }
    } catch (err) {
      console.log(err)
      handleError(err.message)
    }
  }

  const handleUpdateProject = async (id, name) => {
    if (!name) return

    try {
      const res = await fetch(`/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ name })
      })
    
      if (res.ok) {
        setProjects((state) => {
          state = [...state]
          const projectIdx = state.findIndex(project => project.id === id)
          state[projectIdx].name = name
          return [...state]
        })
        return true
      } else {
        const data = await res.json()
        handleError(data.message)
      }
    } catch (err) {
      console.log(err)
      handleError(err.message)
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      const res = await fetch(`/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      
      if (res.ok) {
        setProjects((state) => {
          state = [...state]
          state.splice(state.findIndex(project => project.id === id), 1)
          return [...state]
        })
      } else {
        const data = await res.json()
        handleError(data.message)
      }
    } catch (err) {
      console.log(err)
      handleError(err.message)
    }
  }

  useEffect(() => {
    fetch('/projects', {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          handleError(data.message)
        }
        else {
          data = data.projects.map(project => {
            return {
              id: project._id,
              name: project.name,
              createdAt: project.createdAt
            }
          })
          setProjects(data)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
        handleError(err.message)
      })
  }, [])

  let data = <Loader />

  if (!loading) {
    data = <>
      {projects.map(project => <ProjectInfo
        {...project}
        key={project.id}
        handleUpdateProject={handleUpdateProject}
        handleDeleteProject={handleDeleteProject} />)}
      <Grid item lg={3}>
        <AddInput placeholder="Enter Project Name" btnText="Create" btnClick={handleNewProject} />
      </Grid>
    </>
  }

  return (
    <>
      {error && <Error message={error} />}
      <Grid className={classes['ProjectContainer']} container spacing={4}>
        {data}
      </Grid>
    </>
  )
}

export default isProtected(Projects)