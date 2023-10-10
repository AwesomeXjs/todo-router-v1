import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom/dist'
import {
	completeAll,
	deleteCompleting,
	deleteListHandler,
	deleteUncompleting,
	sortByKey,
} from '../../custom/hooks/Hooks.js'
import ToDo from './ToDo/ToDo'
import styles from './ToDoList.module.scss'

const ToDoList = ({ posts, setPosts }) => {
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
		setPosts(sortByKey(posts, sortKey))
	}, [parsed.sort])

	return (
		<>
			{!!posts.length ? (
				<div>
					<div>
						<Link onClick={() => setSortKey(parsed.sort)} to='?sort=id'>
							Сорт по айди
						</Link>
						<Link onClick={() => setSortKey(parsed.sort)} to='?sort=title'>
							Сорт по title
						</Link>
						<Link
							onClick={() => setSortKey(parsed.sort)}
							to='?sort=description'
						>
							sort by description
						</Link>
					</div>
					{posts.map(e => (
						<ToDo todo={e} key={e.id} posts={posts} setPosts={setPosts} />
					))}
					<button
						onClick={() => deleteListHandler(setPosts)}
						className={styles.buttonDelete}
					>
						Delete all
					</button>
					<hr />
					<button
						onClick={() => deleteCompleting(posts, setPosts)}
						className={styles.buttonDelete}
					>
						Delete Completing
					</button>
					<hr />
					<button
						onClick={() => deleteUncompleting(posts, setPosts)}
						className={styles.buttonDelete}
					>
						Delete uncompleted tasks
					</button>
					<hr />
					<button
						onClick={() => completeAll(posts, setPosts)}
						className={styles.buttonDelete}
					>
						Complete all tasks
					</button>
				</div>
			) : (
				<h1>Tasks not found</h1>
			)}
		</>
	)
}

export default ToDoList
