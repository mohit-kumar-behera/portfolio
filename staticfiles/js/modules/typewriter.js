
const typewriter = function(val, elem, speed) {
	/* Creates a typewriter Effect */
	if (typeof val === 'string') {
		const valArr = [...val];
		let i = 0;

		const tick = function() {
			if (i < valArr.length)	elem.textContent += valArr[i++];
			else clearInterval(tick);
		};
		setInterval(tick, speed);

	} else {
		elem.innerHTML = `<span style='font-size: 0.7rem; background: red; color: white'>Error: Wrong input</span>`;
	}
};

export default typewriter;