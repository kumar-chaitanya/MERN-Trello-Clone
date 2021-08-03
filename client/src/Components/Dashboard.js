import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import Projects from './Projects'
import Project from './Project'

const useStyles = makeStyles({
	dashboard: {
		width: '100%',
		height: '100%',
		background: 'cadetblue',
		overflowX: 'scroll'
	}
})

export default function Dashboard() {
	const classes = useStyles()

	return (
		<div className={classes.dashboard}>
			<Switch>
				<Route path="/projects" exact>
					<Projects />
				</Route>
				<Route path="/projects/:id">
					<Project />
				</Route>
			</Switch>
		</div>
	)
}
