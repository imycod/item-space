export function insertStyle(id, value) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = value;
	link.id = id; // 添加标识
	document.head.appendChild(link);
}

export function removeStyle(id) {
	const existingLink = document.getElementById(id);
	console.log('existingLink--',existingLink)
	if (existingLink) {
		document.head.removeChild(existingLink);
	}
}