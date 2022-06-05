import fs from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const pathToDest = path.join(__dirname, 'files_copy');
  const pathToSource = path.join(__dirname, 'files');

  const exists = async (path) => {
    try {
      await fs.access(path);    
      return true;
    } catch { 
      return false;
    }
  };

  const recCopy = async (pathToSource, pathToDest) => {
    const files = await fs.readdir(pathToSource);
      
    for (const file of files) {
      const pathToSourceFile = path.join(pathToSource, file);
      const pathToDestFile = path.join(pathToDest, file);
      const isDir = (await fs.stat(pathToSourceFile)).isDirectory();
      
      if (isDir) {
        await fs.mkdir(pathToDestFile);
        await recCopy(pathToSourceFile, pathToDestFile);
      } else {
        await fs.copyFile(pathToSourceFile, pathToDestFile);
      }
    }
  };

  try {
    const isPathToDest = await exists(pathToDest);
    const isPathToSource = await exists(pathToSource);

    if (!isPathToSource || isPathToDest) {
      throw new Error('FS operation failed');
    }
    
    await fs.mkdir(pathToDest);
    await recCopy(pathToSource, pathToDest);
  } catch (error) {
    console.error(error.message);
  }
};

copy();