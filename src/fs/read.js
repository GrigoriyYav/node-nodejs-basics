import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pathToFile = path.resolve(__dirname, 'files', 'fileToRead.txt');

  const exists = async (path) => {
    try {
      await fs.access(path);    
      return true;
    } catch { 
      return false;
    }
  };

  try {
    const isPathToFile = await exists(pathToFile);

    if (!isPathToFile) {
      throw new Error("FS operation failed");
    }

    return console.log(await fs.readFile(pathToFile, { encoding: "utf-8" }));
  } catch (error) {
    console.error(error.message);
  }
};

read();