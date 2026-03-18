import { readFile } from 'fs/promises';
import { join } from 'path';

const REMOTE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.belmeha.com';

const getPublicFilePath = (relativePath: string) =>
  join(process.cwd(), 'public', relativePath);

const getRemoteUrl = (relativePath: string) =>
  new URL(relativePath.replace(/^\//, ''), `${REMOTE_BASE_URL.replace(/\/$/, '')}/`).toString();

export async function loadPublicText(
  relativePath: string,
  fallbackValue = ''
): Promise<string> {
  try {
    return await readFile(getPublicFilePath(relativePath), 'utf8');
  } catch (localError) {
    try {
      const response = await fetch(getRemoteUrl(relativePath), {
        next: { revalidate: 3600 }
      });

      if (response.ok) {
        return await response.text();
      }
    } catch (remoteError) {
      console.error(`Error loading ${relativePath}:`, remoteError);
    }

    if (!(localError instanceof Error)) {
      return fallbackValue;
    }

    console.error(`Error reading local ${relativePath}:`, localError);
    return fallbackValue;
  }
}

export async function loadPublicJson<T>(
  relativePath: string,
  fallbackValue: T
): Promise<T> {
  try {
    const fileContents = await readFile(getPublicFilePath(relativePath), 'utf8');
    return JSON.parse(fileContents) as T;
  } catch (localError) {
    try {
      const response = await fetch(getRemoteUrl(relativePath), {
        next: { revalidate: 3600 }
      });

      if (response.ok) {
        return (await response.json()) as T;
      }
    } catch (remoteError) {
      console.error(`Error loading ${relativePath}:`, remoteError);
    }

    if (!(localError instanceof Error)) {
      return fallbackValue;
    }

    console.error(`Error reading local ${relativePath}:`, localError);
    return fallbackValue;
  }
}
