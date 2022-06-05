import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pathToFiles = path.join(__dirname, 'files');

  const exists = async (path) => {
    try {
      await fs.access(path);    
      return true;
    } catch { 
      return false;
    }
  };

  try {
    const isPathToFiles = await exists(pathToFiles);

    if (!isPathToFiles) {
      throw new Error("FS operation failed");
    }
    return console.log(await fs.readdir(pathToFiles))
  } catch (error) {
    console.error(error.message);
  }

};

list();