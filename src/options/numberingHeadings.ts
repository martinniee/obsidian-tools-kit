import { fileContentsProcess } from "./utils/utils";
/**
 * numbering headings
 */
const numberingHeadings = () => {
	let lastNumbers: number[] = [0, 0, 0, 0, 0, 0];
	// whether heading is within code fence
	let isInCode = false;
	fileContentsProcess((line: string) => {
		line = line.trim();
		// Skip the situation that heading within code fencce
		if (line.startsWith("```")) isInCode = !isInCode;

		if (line.startsWith("#") && !isInCode) {
			const len = line.split("#").length - 1;
			if (len === 1) return line;
			const title = line.substring(len + 1).trim();
			lastNumbers[len - 1]++;
			let numbering = lastNumbers.slice(1, len).join(".");
			return `${"#".repeat(len)} ${numbering}-${title}`;
		}
		return line;
	});
};
/**
 * add heading number
 */
export const addHeadingNum = () => {
	removeHeadingNum().then(numberingHeadings);
};
const removeHeadingNum = (): Promise<void> => {
	return fileContentsProcess((line: string) => {
		const numberedHeadingRegex =
			/^#{2,6}(?: +)(?<numbering>(?:(?:\d\.)+)?\d-).*/;
		if (numberedHeadingRegex.test(line)) {
			const numbering = numberedHeadingRegex.exec(line)?.groups
				?.numbering as string;
			return line.replace(numbering, "");
		}
		return line;
	}, true);
};
