import { MarkdownView } from "obsidian";
import {
	fileContentsProcess,
	getContentsArr,
	getFirstH1HeadingPostion,
} from "../utils";

/**
 * Generate table of content in markdown style
 * @returns  markdown toc lists with  link to header
 */
const generateTableOfContents = async (): Promise<string> => {
	const lines = await getContentsArr();
	const toc = []; // Initialize an empty array to hold the table of contents
	let isIncode = false;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (/( *)```/.test(line)) {
			isIncode = !isIncode;
		}
		if (line.startsWith("##") && !isIncode) {
			// If the line starts with a hash symbol, it is a heading
			const level = line.indexOf(" "); // Determine the level of the heading by counting the number of hash symbols
			const text = line.slice(level + 1); // Extract the text of the heading by removing the hash symbols and leading whitespace
			toc.push({ text, level }); // Add the heading to the table of contents
		}
	}
	const markdownToc = toc
		.map((heading) => {
			let { text, level } = heading;
			text.trimEnd().replace(/\s+/g, "_");
			return `${"  ".repeat(level - 1)}- [${text}](#${text})`; // Use the ID to create a link to the heading
		})
		.join("\n");
	return markdownToc;
};
export const removeToc = new fileContentsProcess(
	async (line, metaData) => {
		const tocItemRegex = /(?:  ?)+- \[(((\d\.)+\d-)?(.*))\]\(#\1\)/g;
		if (line.startsWith("**TOC**")) {
			metaData.tocCount.value++;
			if (metaData.tocCount.value === 1) {
				metaData.isInToc.value = !metaData.isInToc.value;
				return "DELELE_LINE";
			}
			if (metaData.isInToc.value) {
				return "DELELE_LINE";
			}
		}
		if (tocItemRegex.test(line) && metaData.isInToc.value) {
			return "DELELE_LINE";
		}
		if (!metaData.isInToc.value) {
			return line;
		}
		const headingRegex = /^#{1,6}(?: +).*(?: +)?$/m;
		if (headingRegex.test(line) && metaData.isInToc.value) {
			metaData.isInToc.value = false;
			return line;
		}
		return line;
	},
	{
		isInToc: {
			value: false,
		},
		tocCount: {
			value: 0,
		},
	},
	2000
);
export const insertToc = async () => {
	await removeToc.process();
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
