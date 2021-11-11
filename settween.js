window.tweenCounter = 0
window.activeTweens = []
function setTween(initialObject, targetProperties, duration = 1000, easingFunction = (x) => x, onComplete = () => {}) {
	let tweenId = ++window.tweenCounter
	let copy = {}
	for(let key in targetProperties) {
		copy[key] = initialObject[key]
	}
	let begin = new Date().getTime()
	setTimeout(() => {
		if(!window.activeTweens.includes(tweenId)) {
			return
		}
		for(let key in targetProperties) {
			initialObject[key] = targetProperties[key]
		}
		onComplete()
		delete window.activeTweens[window.activeTweens.indexOf(tweenId)]
	}, duration)
	window.activeTweens.push(tweenId)
	var runTween = () => {
		if(!window.activeTweens.includes(tweenId)) {
			return
		}
		let delta = (new Date().getTime() - begin) / duration
		for(let key in targetProperties) {
			initialObject[key] = (targetProperties[key] - copy[key]) * easingFunction(delta) + copy[key]
		}
		requestAnimationFrame(runTween)
	}
	runTween()
	return tweenId
}

function clearTween(id) {
	delete window.activeTweens[window.activeTweens.indexOf(id)]
}
