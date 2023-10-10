import CustomButton from '../../../custom/UI/CustomButton/CustomButton'
import { compeleteCheck, deleteSinglePost } from '../../../custom/hooks/Hooks'
import styles from './ToDo.module.scss'

const ToDo = ({ todo, posts, setPosts }) => {
	return (
		<>
			<div
				className={
					todo.completed
						? `${styles.todoWrapper} ${styles.todoComplete}`
						: styles.todoWrapper
				}
			>
				<div
					className={styles.todoContent}
					onClick={() => compeleteCheck(todo.id, posts, setPosts)}
				>
					<div className={styles.titleContent}>
						<h1>Title</h1>
						<p>{todo.title}</p>
					</div>
					{!!todo.description && (
						<div className={styles.descriptContent}>
							<h1>Description:</h1>
							<p>{todo.description}</p>
						</div>
					)}
				</div>
				<div className={styles.idContent}>
					<h3>id: </h3>
					<p>{todo.id}</p>
				</div>

				<CustomButton
					style={{ padding: '5px', border: '1px solid red', color: 'white' }}
					onClick={() => deleteSinglePost(todo.id, posts, setPosts)}
				>
					Delete
				</CustomButton>
			</div>
		</>
	)
}

export default ToDo
