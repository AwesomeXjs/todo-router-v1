import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'

const Menu = () => {
	return (
		<nav>
			<NavLink to={'.'}>Home page</NavLink>
			<NavLink to={'todolist'}>To-Do list</NavLink>
			<NavLink to={'apilist'}>Api list</NavLink>
		</nav>
	)
}

export default Menu
