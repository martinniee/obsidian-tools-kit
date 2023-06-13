import { MarkdownView } from "obsidian";
import { getContentsArr } from "./utils/getContentsAsArr";
import { fileContentsProcess, getFirstH1HeadingPostion } from "./utils/utils";

/**
 * Generate table of content in markdown style
 * @returns  markdown toc lists with  link to header
 */
const generateTableOfContents = async (): Promise<string> => {
	const lines = await getContentsArr();
	const toc = []; // Initialize an empty array to hold the table of contents
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.startsWith("##")) {
			// If the line starts with a hash symbol, it is a heading
			const level = line.indexOf(" "); // Determine the level of the heading by counting the number of hash symbols
			const text = line.slice(level + 1); // Extract the text of the heading by removing the hash symbols and leading whitespace
			toc.push({ text, level }); // Add the heading to the table of contents
		}
	}
	const markdownToc = toc
		.map((heading) => {
			let { text, level } = heading;
			text = text.replace(" ", "%20");
			return `${"  ".repeat(level - 1)}- [${text}](#${text})`; // Use the ID to create a link to the heading
		})
		.join("\n");
	return markdownToc;
};
const insertToc = async () => {
	clearToc();
	const activeView = app.workspace.getActiveViewOfType(MarkdownView);
	const toc = await generateTableOfContents();
	const finalToc = `**TOC**\n${toc}\n`;

	if (activeView && activeView.file) {
		// const cursor = activeView.editor.getCursor();
		activeView.editor.replaceRange(finalToc, {
			line: await getFirstH1HeadingPostion(),
			ch: 0,
		});
	}
};
const clearToc = (): Promise<void> => {
	let isInToc = false;
	fileContentsProcess((line: string): string => {
		const tocItemRegex = /(?:  ?)+- \[(((\d\.)+\d-)?(.*))\]\(#\1\)/g;
		if (line.startsWith("**TOC**")) {
			isInToc = !isInToc;
			return "";
		}
		if (tocItemRegex.test(line) && isInToc) {
			return "DELETED_LINE";
		}
		if (line.startsWith("# ")) {
			isInToc = false;
		}
		if (!isInToc) {
			return line;
		}
		return line;
	});
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 2000);
	});
};
/**
 * Add table  of content to previous line of h1 heading
 */
export const addToc = () => {
	clearToc().then(insertToc);
};
