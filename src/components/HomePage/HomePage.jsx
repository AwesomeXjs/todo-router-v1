import { useState } from 'react'
import styles from './HomePage.module.scss'
import { PiNotePencilFill } from 'react-icons/pi'

const HomePage = () => {
	const [valueText, setValueText] = useState({ title: '', description: '' })
	const changerValue = (type, event) => {
		setValueText({ ...valueText, [type]: event.target.value })
	}
	const addTaskHandler = event => {
		event.preventDefault()
	}

	return (
		<div className={styles.homeWrapper}>
			<h1>TO-DO NOW</h1>
			<PiNotePencilFill />

			<form className={styles.formWrapper} onSubmit={addTaskHandler}>
				<h2>ADD TASK</h2>
				<label>
					Title:
					<input
						onChange={e => changerValue('title', e)}
						value={valueText.title}
						className={styles.input}
						type='text'
					/>
				</label>
				<label>
					Description:
					<textarea
						onChange={e => changerValue('description', e)}
						value={valueText.description}
						className={styles.textArea}
						type='text'
					/>
				</label>
				<button type='submit'>Add Task</button>
			</form>
		</div>
	)
}

export default HomePage
