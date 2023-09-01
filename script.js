import { changeVisibilityControlButtons } from './modules/changeVisibilityControlButtons.js'
import { appendZero } from './modules/appendZero.js'

let settings = document.getElementById('settings')
let workTitle = document.getElementById('workTitle')
let breakTitle = document.getElementById('breakTitle')
let time = document.getElementById('time')
let startBtn = document.getElementById('startBtn')
let pauseBtn = document.getElementById('pauseBtn')
let continueBtn = document.getElementById('continueBtn')
let resetBtn = document.getElementById('resetBtn')
let closeBtn = document.getElementById('closeBtn')
let popup = document.getElementById('popUp')
let form = document.getElementById('form')

let userWorkMinutes = 25
let userBreakMinutes = 5
let paused = true
let changeTimerValuesPerSecond
let secondsCount = 59
let minuteCount = userWorkMinutes - 1

time.textContent = `${userWorkMinutes}:00`

const startTimer = () => {
	changeVisibilityControlButtons('start')
	if (paused) {
		paused = false
		time.textContent = `${appendZero(minuteCount)}:${appendZero(secondsCount)}`
		setIntervalFunc()
	}
}

const pauseTimer = () => {
	paused = true
	clearInterval(changeTimerValuesPerSecond)
	changeVisibilityControlButtons('pause')
}

const continueTimer = () => {
	changeVisibilityControlButtons('continued')
	setIntervalFunc()
}

const resetTimer = () => {
	pauseTimer()
	if (workTitle.classList.contains('active')) {
		minuteCount = userWorkMinutes - 1
		time.textContent = `${userWorkMinutes}:00`
	}else {
		minuteCount = userBreakMinutes - 1
		time.textContent = `${userBreakMinutes}:00`
	}
	secondsCount = 59
	
	changeVisibilityControlButtons('reset')
}

const submitForm = event => {
	event.preventDefault()
	pauseTimer()
	userWorkMinutes = form.querySelector('[name="work"]').value
	userBreakMinutes = form.querySelector('[name="break"]').value
	minuteCount = userWorkMinutes - 1
	secondsCount = 59
	time.textContent = `${userWorkMinutes}:00`
	changeVisibilityControlButtons('reset')
	breakTitle.classList.remove('active')
	workTitle.classList.add('active')
	popup.classList.add('popup_hide')
}

const setWorkTimer = () => {
	breakTitle.classList.remove('active')
	workTitle.classList.add('active')
	pauseTimer()
	minuteCount = userWorkMinutes - 1
	secondsCount = 59
	changeVisibilityControlButtons('reset')
	time.textContent = `${minuteCount + 1}:00`
}

const setBreakTimer = () => {
	workTitle.classList.remove('active')
	breakTitle.classList.add('active')
	pauseTimer()
	minuteCount = userBreakMinutes - 1
	secondsCount = 59
	changeVisibilityControlButtons('reset')
	time.textContent = `${minuteCount + 1}:00`
}

const setIntervalFunc = () => {
	changeTimerValuesPerSecond = setInterval(() => {
		secondsCount--
		time.textContent = `${appendZero(minuteCount)}:${appendZero(secondsCount)}`
		if (secondsCount === 0) {
			if (minuteCount !== 0) {
				minuteCount--
				secondsCount = 60
			} else {
				clearInterval(changeTimerValuesPerSecond)
				//FIXME: изменить когда таймер заканчивается
				if (workTitle.classList.contains('active')) {
					setBreakTimer()
				} else {
					setWorkTimer()
				}
			}
		}
	}, 1000)
}

workTitle.addEventListener('click', setWorkTimer)
breakTitle.addEventListener('click', setBreakTimer)
form.addEventListener('submit', submitForm)
resetBtn.addEventListener('click', resetTimer)
continueBtn.addEventListener('click', continueTimer)
pauseBtn.addEventListener('click', pauseTimer)
startBtn.addEventListener('click', startTimer)
settings.addEventListener('click', () => {
	popup.classList.remove('popup_hide')
})
closeBtn.addEventListener('click', () => {
	popup.classList.add('popup_hide')
})
