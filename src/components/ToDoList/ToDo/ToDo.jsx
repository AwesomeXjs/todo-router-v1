import { compeleteCheck, deleteSinglePost } from '../../../custom/hooks/Hooks'
import styles from './ToDo.module.scss'

const ToDo = ({ todo, posts, setPosts }) => {
	return (
		<>
			<div
				className={
					todo.isComplete
						? `${styles.todoWrapper} ${styles.todoComplete}`
						: styles.todoWrapper
				}
			>
				<h1>Title: {todo.title}</h1>
				<h2>{todo.description ? `Description:${todo.description}` : null}</h2>
				<h3>id: {todo.id}</h3>
				<button
					style={{ color: 'black' }}
					onClick={() => compeleteCheck(todo.id, posts, setPosts)}
				>
					Завершен
				</button>
				<button
					style={{ color: 'black' }}
					onClick={() => deleteSinglePost(todo.id, posts, setPosts)}
				>
					Удалить
				</button>
			</div>
		</>
	)
}

export default ToDo
