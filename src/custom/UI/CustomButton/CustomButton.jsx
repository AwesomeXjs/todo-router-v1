import styles from './CustomButton.module.scss'

const CustomButton = props => {
	const { children, title, onClick } = props
	return (
		<button
			{...props}
			onClick={onClick}
			title={title}
			className={styles.customBtn}
		>
			{children}
		</button>
	)
}

export default CustomButton
