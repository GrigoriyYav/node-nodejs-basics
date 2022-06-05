import os from 'os';
import { Worker } from 'worker_threads';

export const performCalculations = async () => {
  const cpusCount = os.cpus().length;
	const workerFile = new URL('./worker.js', import.meta.url);
	const workers = [];

	for (let i = 0; i < cpusCount; i++) {
		workers.push(
			new Promise((resolve) => {
				const worker = new Worker(workerFile, { workerData: (10 + i) });
				worker.once('message', (data) => resolve({ status: 'resolved', data }));
				worker.once('error', () => resolve({ status: 'error', data: null }));
			})
		);
	}

	return await Promise.all(workers);
};

console.log(await performCalculations());