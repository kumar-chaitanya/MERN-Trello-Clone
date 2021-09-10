import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import Projects from './Projects'
import Project from './Project'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import { ProjectProvider } from '../Contexts/Project.context'

const useStyles = makeStyles({
	dashboard: {
		position: 'relative',
		width: '100vw',
		height: 'calc(100vh - 64px)',
		overflowX: 'scroll',
		scrollbarWidth: 'normal',
		scrollbarColor: '#777 #555',
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#7775',
			'&:hover': {
				backgroundColor: '#7773'
			}
		},
		'&::-webkit-scrollbar-track': {
			backgroundColor: '#5555'
		},
		'&::-webkit-scrollbar': {
			width: '10px',
			height: '10px'
		}
	}
})

export default function Dashboard() {
	const classes = useStyles()

	return (
		<div className={classes.dashboard}>
			<Switch>
				<Route path="/" exact render={() => <></>} />
				<Route path="/login" exact>
					<Login />
				</Route>
				<Route path="/register" exact>
					<Register />
				</Route>
				<Route path="/projects" exact>
					<Projects />
				</Route>
				<Route path="/projects/:id" exact>
					<ProjectProvider>
						<Project />
					</ProjectProvider>
				</Route>
				<Route component={NotFound} />
			</Switch>
		</div>
	)
}
