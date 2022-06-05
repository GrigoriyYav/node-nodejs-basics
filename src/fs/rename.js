import fs from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const newPathToFile = path.resolve(__dirname, 'files' , "properFilename.md");
  const pathToFile = path.resolve(__dirname, 'files' ,"wrongFilename.txt");

  const exists = async (path) => {
    try {
      await fs.access(path);    
      return true;
    } catch { 
      return false;
    }
  };

  try {
    const isNewPathToFile = await exists(newPathToFile);
    const isPathToFile = await exists(pathToFile);

    if (isNewPathToFile || !isPathToFile) {
      throw new Error('FS operation failed');
    }

    await fs.rename(pathToFile, newPathToFile);
  } catch (error) {
    console.error(error.message);
  }
};

rename();