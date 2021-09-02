import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import Projects from './Projects'
import Project from './Project'
import Login from './Login'
import Register from './Register'
import { ProjectProvider } from '../Contexts/Project.context'

const useStyles = makeStyles({
	dashboard: {
		width: '100%',
		height: '90vh',
		background: 'cadetblue',
		overflowX: 'scroll'
	}
})

export default function Dashboard() {
	const classes = useStyles()

	return (
		<div className={classes.dashboard}>
			<Switch>
				<Route path="/login" exact>
					<Login />
				</Route>
				<Route path="/register" exact>
					<Register />
				</Route>
				<Route path="/projects" exact>
					<Projects />
				</Route>
				<Route path="/projects/:id">
					<ProjectProvider>
						<Project />
					</ProjectProvider>
				</Route>
			</Switch>
		</div>
	)
}
