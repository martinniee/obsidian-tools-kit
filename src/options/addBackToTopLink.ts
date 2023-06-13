import { fileContentsProcess } from "./utils/utils";

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
export const addBackToTopLinkForOtherHeaders = async () => {
	fileContentsProcess((line: string, metaData: any) => {
		const h1TitleRegex = /(?<=^# )(?<h1Title>.*)/;
		let h1Title = "";
		if (h1TitleRegex.test(line) && !metaData.flag) {
			metaData.flag = true;
			const match = h1TitleRegex.exec(line) as RegExpExecArray;
			h1Title = match?.groups?.h1Title as string;
			metaData.h1Title = h1Title;
		}
		const otherHeadingRegex = /^(?<otherHeader>#{2,6} +.*)/;
		if (otherHeadingRegex.test(line)) {
			const otherHeader =
				otherHeadingRegex.exec(line)?.groups?.otherHeader;
			// concat
			const afterContent: string = `[回到顶部](#${metaData.h1Title})\n${otherHeader}`;
			return line.replace(otherHeader as string, afterContent);
		}
		return line;
	});
};
/**
 * Clear all existed back-top-links
 */
export const clearBackToTopLink = async () => {
	fileContentsProcess((line: string) => {
		const back2TopLinkRegex = /(\[回到顶部\]\(#.*\))/;
		if (back2TopLinkRegex.test(line)) {
			return line.replace(back2TopLinkRegex, "") as string;
		}
		return line;
	});
};
