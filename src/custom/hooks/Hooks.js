export function sortByKey(array, key) {
	return [...array].sort((a, b) => {
		if (typeof a[key] === 'number') {
			return b[key] - a[key]
		} else if (typeof a[key] === 'string') {
			return a[key] > b[key] ? 1 : -1
		}
		return [...array]
	})
}

/* Delete all tasks */
export const deleteListHandler = setState => {
	setState([])
}

/* Check complete */
export const compeleteCheck = (id, array, setArray) => {
	setArray(
		array.map(e =>
			id === e.id ? { ...e, isComplete: !e.isComplete } : { ...e }
		)
	)
}

/* Delete complete task */
export const deleteCompleting = (array, setArray) => {
	setArray(array.filter(e => e.isComplete === false))
}

/* Delete uncomplete task */
export const deleteUncompleting = (array, setArray) => {
	setArray(array.filter(e => e.isComplete === true))
}

/* All complete task */
export const completeAll = (array, setArray) => {
	setArray(array.map(e => ({ ...e, isComplete: true })))
}

/* Delete single post */
export const deleteSinglePost = (id, array, setArray) => {
	setArray(array.filter(e => e.id !== id))
}
