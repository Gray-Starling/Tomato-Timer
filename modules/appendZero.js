export const appendZero = value => {
	value = value < 10 ? `0${value}` : value
	return value
}
