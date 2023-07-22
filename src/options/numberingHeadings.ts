import { Notice } from "obsidian";
import { fileContentsProcess } from "../utils";

export const numberingHeadings = new fileContentsProcess((lines) => {
	let headingNums = [0, 0, 0, 0, 0, 0];
	let isIncode = false;
	let H1Count = 0;
	let isUnderH1 = false;
	for (let i = 0; i < lines.length; i++) {
		// Skip the situation that heading within code fencce
		if (lines[i].match(/^ *```.*$/m)) {
			isIncode = true;
		}
		if (lines[i].match(/^ *``` *$/m)) {
			isIncode = false;
		}
		// If current line is H1
		if (lines[i].startsWith("# ") && H1Count === 0) {
			H1Count++;
			isUnderH1 = !isUnderH1;
		}
		// Determine if current line matches the heading level of that less than H1
		if (lines[i].match(/^#{2,6} .*$/m) && !isIncode && isUnderH1) {
			const headingHashRegex = /^#{2,6}/m;
			const headingHashText = (
				lines[i].match(headingHashRegex) as RegExpMatchArray
			)[0];
			const headingLevel = headingHashText.split("#").length - 1;
			headingNums = headingNums.map((item, index) => {
				if (index > headingLevel - 1) {
					item = 0;
					return item;
				} else {
					return item;
				}
			});
			headingNums[headingLevel - 1]++;
			// '1' indicates that slice starts from heading 2 level
			const headingNum = headingNums.slice(1, headingLevel).join(".");
			let headingText = lines[i].slice(headingLevel).trim();
			if (lines[i].includes(" ")) {
				headingText = headingText.replaceAll(/(?: +|	+)/g, "_");
			}
			lines[i] = `${headingHashText} ${headingNum}-${headingText}`;
		} else {
			continue;
		}
	}
	if (!isUnderH1) {
		new Notice("当前笔记没有一级标题，无法编号", 3000);
	}
	return lines;
});
export const removeHeadingNum = new fileContentsProcess((lines) => {
	for (let i = 0; i < lines.length; i++) {
		const numberedHeadingRegex =
			/#{2,6}(\s+)(?<numbering>((?:(?:\d+\.)+(?:\d+)-)+)+|(?:(?:\d+-)+)).*/;
		if (lines[i].match(numberedHeadingRegex)) {
			const numbering = lines[i].match(numberedHeadingRegex)?.groups
				?.numbering as string;
			lines[i] = lines[i].replace(numbering, "");
		}
		continue;
	}
	return lines;
}, 2000);
