export interface Contact {
	name: string;
	link: string;
	letter: string;
}

export const getContacts = (): Contact[] => [
	{
		name: "LinkedIn",
		link: "https://www.linkedin.com/in/rostyslav-belmega-8b540643",
		letter: "l",
	},
	{
		name: "Twitter",
		link: "https://twitter.com/izzz0",
		letter: "t",
	},
	{
		name: "GitHub",
		link: "https://github.com/rbelmega",
		letter: "g",
	},
];
