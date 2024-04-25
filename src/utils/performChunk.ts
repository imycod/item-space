// @ts-nocheck
export default function browserPerformChunk(datas, taskHandler) {
	const scheduler = (task) => {
		requestIdleCallback((ide) => {
			task(() => ide.timeRemaining());
		});
	};
	performChunk(datas, taskHandler, scheduler);
}

export function performChunk(datas, taskHandler, scheduler) {
	if (typeof datas === 'number') {
		datas = {
			length: datas,
		};
	}
	if (datas.length === 0) return;
	// 1. 下次分片什么时候开始
	// 2. 每次分片执行多少
	let i = 0;

	function _run() {
		// i >= 任务长度 越界表示已经没有任务了
		if (i >= datas.length) return;
		scheduler((goOn) => {
			// 浏览器渲染1帧16.6ms 计算机以ns为单位
			// 在1个渲染帧中空闲时开启执行任务
			while (i < datas.length && goOn()) {
				taskHandler(datas[i], i);
				i++;
			}
			// 此次分片完成，重复调用_run
			_run();
		});
	}
	_run();
}