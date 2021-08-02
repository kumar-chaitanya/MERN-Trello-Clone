import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Projects() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState()

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then(res => res.json())
      .then(data => {
        data = data.projects.map(project => {
          return {
            id: project._id,
            name: project.name
          }
        })
        setProjects(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  let data = <div>Loading Your Projects......</div>

  if(!loading) {
    data = <div>
      {projects.map(project => {
        return (
          <div style={{margin: '8px'}} key={project.id}>
            <p>{project.name}</p>
            <Link to={`/projects/${project.id}`}>Go to Project</Link>
          </div>
        )
      })}
    </div>
  }

  return data
}

export default Projects