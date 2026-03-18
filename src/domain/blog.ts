import { loadPublicJson } from './public-content';

export interface Post {
  file: string;
  id: string;
  name: string;
  date: string;
}

export const getPosts = async (): Promise<Post[]> => {
  return loadPublicJson<Post[]>('posts.json', []);
};
