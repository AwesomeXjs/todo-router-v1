import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom/dist'
import queryString from 'query-string'
import {
	completeAll,
	deleteCompleting,
	deleteListHandler,
	deleteUncompleting,
	sortByKey,
} from '../../custom/hooks/Hooks'
import ToDo from '../ToDoList/ToDo/ToDo'
import styles from './ApiList.module.scss'

const ApiList = () => {
	const [apiPosts, setApiPosts] = useState([])
	const [apiUrl, setApiUrl] = useState('')
	const location = useLocation()
	const navigate = useNavigate()
	const parsed = queryString.parse(location.search)
	const [sortKey, setSortKey] = useState(parsed.sort)

	useEffect(() => {
		const KEYS = ['id', 'title', 'description', 'isComplete']
		if (!KEYS.includes(parsed.sort)) {
			navigate('.')
		}
		setSortKey(parsed.sort)
		setApiPosts(sortByKey(apiPosts, sortKey))
	}, [parsed.sort])

	const submitHandler = event => {
		event.preventDefault()
	}
	const apiRequest = async api => {
		try {
			const res = await fetch(api)
			const posts = await res.json()
			setApiPosts(posts)
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<div>
			<div>
				<Link onClick={() => setSortKey(parsed.sort)} to='?sort=id'>
					Сорт по айди
				</Link>
				<Link onClick={() => setSortKey(parsed.sort)} to='?sort=title'>
					Сорт по title
				</Link>
				<Link onClick={() => setSortKey(parsed.sort)} to='?sort=description'>
					sort by description
				</Link>
			</div>
			<div>
				<button onClick={() => deleteListHandler(setApiPosts)}>
					Delete all
				</button>
				<hr />
				<button onClick={() => deleteCompleting(apiPosts, setApiPosts)}>
					Delete Completing
				</button>
				<hr />
				<button onClick={() => deleteUncompleting(apiPosts, setApiPosts)}>
					Delete uncompleted tasks
				</button>
				<hr />
				<button onClick={() => completeAll(apiPosts, setApiPosts)}>
					Complete all tasks
				</button>
			</div>
			<form onSubmit={submitHandler}>
				<label>
					Введите url todos:
					<input
						type='text'
						value={apiUrl}
						onChange={e => setApiUrl(e.target.value)}
					/>
				</label>
				<button
					type='submit'
					onClick={() => apiRequest(apiUrl)}
					style={{ color: 'black' }}
				>
					Go!
				</button>
				<button
					type='submit'
					onClick={() =>
						apiRequest('https://jsonplaceholder.typicode.com/todos')
					}
					style={{ color: 'black' }}
				>
					Example from placeholder.com
				</button>
			</form>

			{apiPosts.map(e => (
				<ToDo posts={apiPosts} setPosts={setApiPosts} todo={e} key={e.id} />
			))}
		</div>
	)
}

export default ApiList
