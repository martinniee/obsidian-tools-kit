import {
	startMardownCodefencesymbol,
	endMardownCodefencesymbol,
} from "src/config/regex";
import { deleteArrayElement, fileContentsProcess } from "../utils";
export const deleteBackToTopLink = new fileContentsProcess((arr, plugin) => {
	let isIncode = false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (arr[i].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		const back2TopLinkRegex = new RegExp(
			`\\[(?:${plugin?.settings?.backToTopText as string})\\]\\(.*\\)`
		);
		if (arr[i].match(back2TopLinkRegex) && !isIncode) {
			arr = deleteArrayElement(arr, i);
		}
	}
	return arr;
});
/**
 *
 * Add back to top link for other headers
 *
 * OtherHeaders: markdown headers excludes h1 header
 *
 * example:
 * 		## foo
 *  -------- ↓ ----------
 * 		[回到顶部](#H1-foo)
 * 		## foo
 *
 * @param docContent current note content
 */
export const addBackToTopLink = new fileContentsProcess((lines, plugin) => {
	let H1Count = 0,
		isIncode = false,
		H1Title = "";
	for (let i = 0; i < lines.length; i++) {
		const h1TitleRegex = /(?<=# )(?<h1Title>.*)/;
		if (h1TitleRegex.test(lines[i]) && H1Count === 0 && !isIncode) {
			// replace all space in  title with underscore
			lines[i] = replaceSpaceWithUnderScore(lines[i])
			H1Count++;
			H1Title = lines[i].match(/(?<=# )(?<h1Title>.*)/)?.groups
				?.h1Title as string;
		}
		if (lines[i].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (lines[i].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		const otherHeadingsRegex = /(?<otherHeader>#{2,6} +.*)/;
		if (lines[i].match(otherHeadingsRegex) && !isIncode) {
			const otherHeader = otherHeadingsRegex.exec(lines[i])?.groups
				?.otherHeader as string;
			const afterContent: string = `[${plugin?.settings?.backToTopText}](#${H1Title})\n${otherHeader}`;
			lines[i] = lines[i].replace(otherHeader, afterContent);
		}
	}
	return lines;
}, 2000);

const replaceSpaceWithUnderScore = (line: string): string => {
	const h1HeadingRegex = /(?<hashSign>^# )(?<title>.*?)(?<tailSpace> *)$/m;
	const hashSignText = line.match(h1HeadingRegex)?.groups?.hashSign as string;
	const titleText = line.match(h1HeadingRegex)?.groups?.title as string;
	return `${hashSignText}${titleText.replaceAll(/(?: +|	+)/g, "_")}`;
};
