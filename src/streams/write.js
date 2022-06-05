import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const fd = await fs.open(path.resolve(__dirname,'files','fileToWrite.txt'), 'w');
	const outputStream = fd.createWriteStream({ encoding: 'utf-8' });
	process.stdin.pipe(outputStream);
};

write();