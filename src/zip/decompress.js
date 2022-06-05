import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import { createGunzip } from 'zlib';

export const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
		const source = await fs.open(path.resolve(__dirname, 'files' ,'archive.gz' ), 'r');
		const destination = await fs.open(path.resolve(__dirname, 'files' ,'fileToCompress.txt' ), 'w');

		const readStream = source.createReadStream();
		const writeStream = destination.createWriteStream();
		const gunzip = createGunzip();

		await pipeline(readStream, gunzip, writeStream);
	} catch (err) {
		console.error('An error occurred:', err);
		process.exitCode = 1;
	}
};

decompress();