import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pathToFile = path.resolve(__dirname, 'files', 'fileToRemove.txt');

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
      throw new Error('FS operation failed');
    }

    await fs.unlink(pathToFile);
  } catch (error) {
    console.error(error.message);
  }
};

remove();