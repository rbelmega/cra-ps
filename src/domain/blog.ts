import { readFile } from 'fs/promises';
import { join } from 'path';

export interface Post {
  file: string;
  id: string;
  name: string;
  date: string;
}

export const getPosts = async (): Promise<Post[]> => {
  // In development/build, read from local file system
  if (process.env.NODE_ENV !== 'production' || process.env.USE_LOCAL_POSTS === 'true') {
    try {
      const filePath = join(process.cwd(), 'public', 'posts.json');
      const fileContents = await readFile(filePath, 'utf8');
      return JSON.parse(fileContents);
    } catch (error) {
      console.error('Error reading local posts.json:', error);
    }
  }
  
  // In production, try to fetch from local first, then remote
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.belmeha.com';
    const response = await fetch(`${baseUrl}/posts.json`, {
      cache: 'no-store'
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching posts.json:', error);
  }
  
  return [];
};
