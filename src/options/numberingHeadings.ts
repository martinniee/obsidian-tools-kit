import { fileContentsProcess } from "../utils";

export const numberingHeadings = new fileContentsProcess(
	async (line, metaData) => {
		// Skip the situation that heading within code fencce
		
		if (/( *)```/.test(line)) {
			metaData.isInCode.value = !metaData.isInCode.value;
		}
		// If current line is H1
		if (line.startsWith("# ") && metaData.H1Count.value === 0) {
			metaData.H1Count.value++;
			metaData.isUnderH1.value = !metaData.isUnderH1.value;
		}
		// Determine if current line matches the heading level of that over than H1
		if (
			line.startsWith("##") &&
			!metaData.isInCode.value &&
			metaData.isUnderH1.value
		) {
			// Determine if number exists in heading
			const numberedHeadingRegex =
				/^#{2,6}(\s+)(?<numbering>((?:(?:\d+\.)+(?:\d+)-)+)+|(?:(?:\d+-)+)).*/;
			if (numberedHeadingRegex.test(line)) {
				// Update: Remove number
				let numbering = numberedHeadingRegex.exec(line)?.groups
					?.numbering as string;
				line = line.replace(numbering, "");
			}
			// Insert  number
			const titleHashRegex = /(?<titleHash>#{2,6})(?: +).*(?: +)?/;
			if (titleHashRegex.test(line)) {
				let titleHash = titleHashRegex.exec(line)?.groups
					?.titleHash as string;
				const len = titleHash.split("#").length - 1; // hash sign number indicateing heading level
				const title = line
					.substring(len + 1)
					.trimEnd()
					.replace(/\s+/g, "_");
				metaData.lastNumbers.value[len - 1]++;
				if (metaData.lastNumbers.value instanceof Array) {
					let numbering = metaData.lastNumbers.value
						.slice(1, len)
						.join(".");
					return `${"#".repeat(len)} ${numbering}-${title}`;
				}
			}
		}
		return line;
	},
	{
		lastNumbers: {
			value: [0, 0, 0, 0, 0, 0],
		},
		isInCode: {
			value: false,
		},
		isUnderH1: {
			value: false,
		},
		H1Count: {
			value: 0,
		},
	}
);
export const removeHeadingNum = new fileContentsProcess(
	async (line) => {
		const numberedHeadingRegex =
			/#{2,6}(\s+)(?<numbering>((?:(?:\d+\.)+(?:\d+)-)+)+|(?:(?:\d+-)+)).*/;
		if (numberedHeadingRegex.test(line)) {
			const numbering = numberedHeadingRegex.exec(line)?.groups
				?.numbering as string;
			line = line.replace(numbering, "");
		}
		return line;
	},
	{},
	2000
);
