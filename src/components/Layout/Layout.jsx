import { Outlet } from 'react-router-dom'
import Menu from '../Menu/Menu'
import styles from './Layout.module.scss'

const Layout = () => {
	return (
		<>
			<Menu />
			<Outlet />
		</>
	)
}

export default Layout
