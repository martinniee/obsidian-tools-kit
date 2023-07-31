import { MarkdownView } from "obsidian";
import {
	deleteArrayElement,
	fileContentsProcess,
	getContentsArr,
	getFirstH1HeadingPostion,
} from "../utils";
import {
	startMardownCodefencesymbol,
	endMardownCodefencesymbol,
} from "src/config/regex";

/**
 * Generate table of content in markdown style
 * @returns  markdown toc lists with  link to header
 */
const generateTableOfContents = async (): Promise<string> => {
	let lines = await getContentsArr();
	// pre-process all the lines
	lines = replaceSpaceWithUnderScore(lines);
	const toc = []; // Initialize an empty array to hold the table of contents
	let isIncode = false;
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (lines[i].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		if (lines[i].startsWith("##") && !isIncode) {
			// If the line starts with a hash symbol, it is a heading
			const level = lines[i].indexOf(" "); // Determine the level of the heading by counting the number of hash symbols
			const text = lines[i].slice(level + 1); // Extract the text of the heading by removing the hash symbols and leading whitespace
			toc.push({ text, level }); // Add the heading to the table of contents
		}
	}
	const markdownToc = toc
		.map((heading) => {
			let { text, level } = heading;
			return `${"  ".repeat(level - 1)}- [${text}](#${text})`; // Use the ID to create a link to the heading
		})
		.join("\n");
	return markdownToc;
};
/**
 * 删除 toc 需要考虑 连续的 删除项导致的索引不一致（当前索引>要删除的项的索引）
 */
export const removeToc = new fileContentsProcess((lines) => {
	let firstMatch = 0;
	const tocItemRegex = /(?:  ?)+- \[(((\d\.)+\d-)?(.*))\]\(#\1\)/g;
	let isIncode = false;
	while (firstMatch < lines.length) {
		if (lines[firstMatch].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (lines[firstMatch].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		if (lines[firstMatch].startsWith("**TOC**") && !isIncode) {
			lines = deleteArrayElement(lines, firstMatch);
			continue;
		}
		if (lines[firstMatch].match(tocItemRegex) && !isIncode) {
			lines = deleteArrayElement(lines, firstMatch);
			continue;
		}
		const headingRegex = /^#{1,6}(?: +).*(?: +)?$/m;
		if (lines[firstMatch].match(headingRegex)) {
			firstMatch++;
			continue;
		}
		firstMatch++;
		continue;
	}
	return lines;
}, 2000);
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
const replaceSpaceWithUnderScore = (arr: string[]): string[] => {
	const headingRegex = /(?<hashSign>^#{2,6} )(?<title>.*?)(?<tailSpace> *)$/m;
	let isIncode = false;
	return arr.map((item) => {
		if (item.match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (item.match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		if (!item.match(headingRegex)) return item;
		const hashSignText = item.match(headingRegex)?.groups
			?.hashSign as string;
		const titleText = item.match(headingRegex)?.groups?.title as string;
		if (!isIncode) {
			return `${hashSignText}${titleText.replaceAll(/(?: +|	+)/g, "_")}`;
		} else {
			return `${hashSignText}${titleText}`;
		}
	});
};
