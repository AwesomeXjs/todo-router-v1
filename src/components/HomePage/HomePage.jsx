import { useState } from 'react'
import styles from './HomePage.module.scss'
import { PiNotePencilFill } from 'react-icons/pi'
import CustomButton from '../../custom/UI/CustomButton/CustomButton'
import CustomInput from '../../custom/UI/CustomInput/CustomInput'
import { Link } from 'react-router-dom/dist'

const HomePage = ({ posts, addTaskHandler }) => {
	const [valueText, setValueText] = useState({ title: '', description: '' })
	const changerValue = (type, event) => {
		setValueText({ ...valueText, [type]: event.target.value })
	}

	return (
		<div className={styles.homeWrapper}>
			<h1 className={styles.toDoTitle}>TO-DO NOW</h1>
			<div className={styles.iconHomePage}>
				<p></p>
			</div>
			<PiNotePencilFill style={{ fontSize: '50px' }} />
			<form
				className={styles.formWrapper}
				onSubmit={event => addTaskHandler(event, valueText, setValueText)}
			>
				<h2 className={styles.addTastTitle}>ADD TASK</h2>
				<label className={styles.label}>
					<h3>Title:</h3>
					<CustomInput
						onChange={e => changerValue('title', e)}
						value={valueText.title}
						type='text'
						placeholder='type title...'
					/>
				</label>
				<label>
					<h3>Description:</h3>
					<textarea
						onChange={e => changerValue('description', e)}
						rows='10'
						cols='30'
						value={valueText.description}
						className={styles.textArea}
						type='text'
						placeholder='Type description...'
					/>
				</label>
				<CustomButton type='submit'>Add Task</CustomButton>
			</form>
			{!!posts.length && (
				<Link to='/todolist'>
					<CustomButton
						style={{ border: '1px solid white', backgroundColor: 'green' }}
					>
						Check task list!
					</CustomButton>
				</Link>
			)}
		</div>
	)
}

export default HomePage
