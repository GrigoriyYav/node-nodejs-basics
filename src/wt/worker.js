import { parentPort, workerData } from 'worker_threads';

export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
  const n = parseInt(workerData);
	if (isNaN(n) || n < 0) {
		throw new Error('Bad argument');
	}
	parentPort.postMessage(nthFibonacci(n));
};

sendResult();