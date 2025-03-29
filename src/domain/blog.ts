export interface Post {
  file: string;
  id: string;
  name: string;
  date: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://www.belmeha.com/posts.json');
  return response.ok ? await response.json() : [];
};
