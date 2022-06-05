import { createReadStream } from 'fs';
import path from 'path';
import { createHash } from "crypto";
import { fileURLToPath } from 'url';

export const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

	const hash = createHash('sha256');

	const input = createReadStream(path.resolve(__dirname ,'files','fileToCalculateHashFor.txt'));
	input.pipe(hash).setEncoding('hex').pipe(process.stdout);
};

calculateHash();