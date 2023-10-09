import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/_style.scss'
import Layout from './components/Layout/Layout'
import HomePage from './components/HomePage/HomePage'

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route to='/' element={<Layout />}>
						<Route index element={<HomePage />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
