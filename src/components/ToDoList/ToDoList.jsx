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
import CustomButton from '../../custom/UI/CustomButton/CustomButton.jsx'

const ToDoList = ({ posts, setPosts, customStyleButtons }) => {
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
					<div className={styles.sortWrapper}>
						<Link onClick={() => setSortKey(parsed.sort)} to='?sort=id'>
							<CustomButton style={customStyleButtons}>
								{' '}
								Sort by ID
							</CustomButton>
						</Link>
						<Link onClick={() => setSortKey(parsed.sort)} to='?sort=title'>
							<CustomButton style={customStyleButtons}>
								{' '}
								Sort by title
							</CustomButton>
						</Link>
						<Link
							onClick={() => setSortKey(parsed.sort)}
							to='?sort=description'
						>
							<CustomButton style={customStyleButtons}>
								Sort by description
							</CustomButton>
						</Link>
					</div>
					<div className={styles.actionWrapper}>
						<CustomButton
							style={customStyleButtons}
							onClick={() => deleteListHandler(setPosts)}
							className={styles.buttonDelete}
						>
							Delete all
						</CustomButton>

						<CustomButton
							style={customStyleButtons}
							onClick={() => deleteCompleting(posts, setPosts)}
							className={styles.buttonDelete}
						>
							Delete Completing
						</CustomButton>

						<CustomButton
							style={customStyleButtons}
							onClick={() => deleteUncompleting(posts, setPosts)}
							className={styles.buttonDelete}
						>
							Delete uncompleted tasks
						</CustomButton>

						<CustomButton
							style={customStyleButtons}
							onClick={() => completeAll(posts, setPosts)}
							className={styles.buttonDelete}
						>
							Complete all tasks
						</CustomButton>
					</div>
					{posts.map(e => (
						<ToDo todo={e} key={e.id} posts={posts} setPosts={setPosts} />
					))}
				</div>
			) : (
				<h1>Tasks not found</h1>
			)}
		</>
	)
}

export default ToDoList
