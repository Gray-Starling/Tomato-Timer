let startBtn = document.getElementById('startBtn')
let pauseBtn = document.getElementById('pauseBtn')
let continueBtn = document.getElementById('continueBtn')
let resetBtn = document.getElementById('resetBtn')

export const changeVisibilityControlButtons = ev => {
	switch (ev) {
		case 'start':
			startBtn.classList.remove('show')
			pauseBtn.classList.add('show')
			resetBtn.classList.add('show')
			break
		case 'pause':
			pauseBtn.classList.remove('show')
			continueBtn.classList.add('show')
			break
		case 'continued':
			pauseBtn.classList.add('show')
			continueBtn.classList.remove('show')
			break
		case 'reset':
			pauseBtn.classList.remove('show')
			resetBtn.classList.remove('show')
			continueBtn.classList.remove('show')
			startBtn.classList.add('show')
			break
		default:
			break
	}
}
