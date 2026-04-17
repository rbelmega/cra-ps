import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const REMOTE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.belmeha.com";
const REMOTE_REVALIDATE_SECONDS = 3600;

const getPublicFilePath = (relativePath: string) => join(process.cwd(), "public", relativePath);

const getRemoteUrl = (relativePath: string) =>
	new URL(relativePath.replace(/^\//, ""), `${REMOTE_BASE_URL.replace(/\/$/, "")}/`).toString();

async function loadPublicResource<T>(
	relativePath: string,
	fallbackValue: T,
	parseLocal: (content: string) => T,
	parseRemote: (response: Response) => Promise<T>,
): Promise<T> {
	try {
		const fileContents = await readFile(getPublicFilePath(relativePath), "utf8");
		return parseLocal(fileContents);
	} catch (localError) {
		try {
			const response = await fetch(getRemoteUrl(relativePath), {
				next: { revalidate: REMOTE_REVALIDATE_SECONDS },
			});

			if (response.ok) {
				return await parseRemote(response);
			}
		} catch (remoteError) {
			console.error(`Error loading ${relativePath}:`, remoteError);
		}

		if (localError instanceof Error) {
			console.error(`Error reading local ${relativePath}:`, localError);
		}

		return fallbackValue;
	}
}

export async function loadPublicText(relativePath: string, fallbackValue = ""): Promise<string> {
	return loadPublicResource(
		relativePath,
		fallbackValue,
		(content) => content,
		(response) => response.text(),
	);
}

export async function loadPublicJson<T>(relativePath: string, fallbackValue: T): Promise<T> {
	return loadPublicResource(
		relativePath,
		fallbackValue,
		(content) => JSON.parse(content) as T,
		async (response) => (await response.json()) as T,
	);
}
