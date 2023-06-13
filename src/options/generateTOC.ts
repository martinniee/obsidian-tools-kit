import { MarkdownView } from "obsidian";
import { getContentsArr } from "./utils/getContentsAsArr";
import { getFirstH1HeadingPostion } from "./utils/utils";

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
			const { text, level } = heading;
			const id = text.toLowerCase().replace(/\s+/g, "-"); // Generate an ID for the heading by converting the text to lowercase and replacing spaces with hyphens
			return `${"  ".repeat(level - 1)}- [${text}](#${id})`; // Use the ID to create a link to the heading
		})
		.join("\n");
	return markdownToc;
};
export const insertToc = async () => {
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
