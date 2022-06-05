import fs from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = path.resolve(__dirname, 'files' ,'fresh.txt' );
  
  const exists = async (path) => {
    try {
      await fs.access(path);    
      return true;
    } catch { 
      return false;
    }
  };

  const fileExists = await exists(filePath);

  try {
    if(fileExists){
      throw new Error('FS operation failed');
    } else {
      await fs.appendFile(filePath, 'I am fresh and young');
    } 
  } catch (error) {
    console.error(error.message);
  }
};

create();