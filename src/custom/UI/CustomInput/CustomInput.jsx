import styles from './CustomInput.module.scss'

const CustomInput = props => {
	const { children } = props
	return (
		<input className={styles.customInput} {...props}>
			{children}
		</input>
	)
}

export default CustomInput
