function adventCanvas(containerId, drawFunction, handlers) {
	let canvas, context
	let pixelRato = 1
	let canvasContainer = document.getElementById("day-3")
	canvas = document.createElement("canvas")
	canvas.width = 128
	canvas.height = 128
	canvasContainer.appendChild(canvas)
	document.addEventListener("DOMContentLoaded", () => {
		context = canvas.getContext("2d")
		context.imageSmoothingEnabled = false
		pixelRato = getPixelRatio(context)
		animate()

		for(let key in handlers) {
			canvas.addEventListener(key, handlers[key])
		}		
	})

	function animate() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawFunction(context)
		requestAnimationFrame(animate);
	}

	function getPixelRatio(context) {
		let dpr = window.devicePixelRatio || 1;
		let bsr = context.webkitBackingStorePixelRatio ||
			context.mozBackingStorePixelRatio ||
			context.msBackingStorePixelRatio ||
			context.oBackingStorePixelRatio ||
			context.backingStorePixelRatio || 1;

		return dpr / bsr;
	}

	window.addEventListener("resize", onResize)

	function onResize() {
		pixelRato = getPixelRatio(context)
		let canvasBounds = canvas.getBoundingClientRect();
		canvas.width = canvasBounds.width * pixelRato;
		canvas.height = canvasBounds.height * pixelRato;
		context.scale(pixelRato, pixelRato);
	}
	return {canvas: canvas, context:context}
}