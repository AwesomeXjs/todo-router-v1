import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './scss/_style.scss'
import Layout from './components/Layout/Layout'
import HomePage from './components/HomePage/HomePage'
import ToDoList from './components/ToDoList/ToDoList'
import ApiList from './components/ApiList/ApiList'
import NotFound from './components/NotFound/NotFound'

function App() {
	const [posts, setPosts] = useState([])

	const addTaskHandler = (event, data, setData) => {
		event.preventDefault()
		if (!!data.title && !!data.description) {
			setPosts([
				...posts,
				{
					title: data.title,
					description: data.description,
					isComplete: false,
					id: uuidv4(),
				},
			])
		}
		setData({ title: '', description: '' })
	}

	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route
							index
							element={<HomePage addTaskHandler={addTaskHandler} />}
						/>
						<Route
							path='todolist'
							element={<ToDoList posts={posts} setPosts={setPosts} />}
						/>
						<Route path='apilist' element={<ApiList />} />
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
