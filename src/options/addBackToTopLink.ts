import { fileContentsProcess } from "./utils/utils";
export const deleteBackToTopLink = new fileContentsProcess(
	async (line, metaData, plugin) => {
		const back2TopLinkRegex = new RegExp(
			`\\[(?:${plugin?.settings?.backToTopText})\\]\\(.*\\)`
		);
		if (back2TopLinkRegex.test(line)) {
			return line.replace(back2TopLinkRegex, "");
		}
		return line;
	}
);
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
export const addBackToTopLink = new fileContentsProcess(
	async (line, metaData, plugin) => {
		const h1TitleRegex = /(?<=# )(?<h1Title>.*)/;
		if (
			h1TitleRegex.test(line) &&
			metaData.H1Count.value === 0 &&
			!metaData.isInCode.value
		) {
			metaData.H1Count.value++;
			metaData.H1Title.value = /(?<=# )(?<h1Title>.*)/.exec(line)?.groups
				?.h1Title as string;
		}
		if (/( *)```/.test(line)) {
			metaData.isInCode.value = !metaData.isInCode.value;
		}
		const otherHeadingsRegex = /(?<otherHeader>#{2,6} +.*)/;
		if (otherHeadingsRegex.test(line) && !metaData.isInCode.value) {
			const otherHeader = otherHeadingsRegex.exec(line)?.groups
				?.otherHeader as string;
			const afterContent: string = `[${plugin?.settings?.backToTopText}](#${metaData.H1Title.value})\n${otherHeader}`;
			return line.replace(otherHeader, afterContent);
		}
		return line;
	},
	{
		isInCode: {
			value: false,
		},
		H1Title: {
			value: "",
		},
		H1Count: {
			value: 0,
		},
	},
	2000,
	deleteBackToTopLink
);
