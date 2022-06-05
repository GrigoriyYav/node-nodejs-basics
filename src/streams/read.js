import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fd = await fs.open(path.resolve(__dirname,'files','fileToRead.txt'));
	const inputStream = fd.createReadStream({ encoding: 'utf-8' });
	inputStream.pipe(process.stdout);
};

read();