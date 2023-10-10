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
import CustomButton from '../../custom/UI/CustomButton/CustomButton'
import CustomInput from '../../custom/UI/CustomInput/CustomInput'

const ApiList = ({ customStyleButtons }) => {
	const [apiPosts, setApiPosts] = useState([])
	const [apiQty, setApiQty] = useState(0)
	const location = useLocation()
	const navigate = useNavigate()
	const parsed = queryString.parse(location.search)
	const [sortKey, setSortKey] = useState(parsed.sort)

	useEffect(() => {
		const KEYS = ['id', 'title', 'isComplete']
		if (!KEYS.includes(parsed.sort)) {
			navigate('.')
		}
		setApiPosts(sortByKey(apiPosts, sortKey))
		setSortKey(parsed.sort)
	}, [parsed.sort])

	const submitHandler = event => {
		event.preventDefault()
	}
	const numberPosts = api => {
		fetch(`https://jsonplaceholder.typicode.com/todos`)
			.then(response => response.json())
			.then(post => setApiPosts([...post].filter((e, i) => i < api)))
	}

	return (
		<div>
			<div className={styles.sortWrapper}>
				<Link onClick={() => setSortKey('id')} to='?sort=id'>
					<CustomButton style={customStyleButtons}>Sort by ID</CustomButton>
				</Link>
				<Link onClick={() => setSortKey('title')} to='?sort=title'>
					<CustomButton style={customStyleButtons}>Sort by title</CustomButton>
				</Link>
			</div>

			<form className={styles.formWrapper} onSubmit={submitHandler}>
				<label className={styles.label}>
					<p>How many tasks:</p>
					<CustomInput
						type='number'
						value={apiQty}
						onChange={e => setApiQty(e.target.value)}
					/>
				</label>
				<CustomButton type='submit' onClick={() => numberPosts(apiQty)}>
					Go!
				</CustomButton>
			</form>
			<div className={styles.actionWrapper}>
				<CustomButton
					style={customStyleButtons}
					onClick={() => deleteListHandler(setApiPosts)}
				>
					Delete all tasks
				</CustomButton>

				<CustomButton
					style={customStyleButtons}
					onClick={() => deleteCompleting(apiPosts, setApiPosts)}
				>
					Delete Complete tasks
				</CustomButton>

				<CustomButton
					style={customStyleButtons}
					onClick={() => deleteUncompleting(apiPosts, setApiPosts)}
				>
					Delete uncomplete tasks
				</CustomButton>

				<CustomButton
					style={customStyleButtons}
					onClick={() => completeAll(apiPosts, setApiPosts)}
				>
					Complete all tasks
				</CustomButton>
			</div>
			<div className={styles.apiListWrapper}>
				{apiPosts.map(e => (
					<ToDo posts={apiPosts} setPosts={setApiPosts} todo={e} key={e.id} />
				))}
			</div>
		</div>
	)
}

export default ApiList
