import { fileContentsProcess } from "./utils/utils";
/**
 * numbering headings
 */
export const numberingHeadings = () => {
	let lastNumbers: number[] = [0, 0, 0, 0, 0, 0];
	// whether heading is within code fence
	let isInCode = false;
	fileContentsProcess((line: string) => {
        line = line.trim();
        // Skip the situation that heading within code fencce
		if (line.startsWith("```")) isInCode = !isInCode;
		if (line.startsWith("#") && !isInCode) {
			const len = line.split("#").length - 1;
			if (len > 1 && lastNumbers[0] === 0) return line;
			const title = line.substring(len + 1);
			lastNumbers[len - 1]++;
			let numbering = lastNumbers.slice(0, len).join(".");
			return `${"#".repeat(len)} ${numbering}-${title}`;
		}
		return line;
	});
};
