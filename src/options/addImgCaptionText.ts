import nlToolsKit from "main";
import { fileContentsProcess, processFunc } from "../utils";
import type { metaData } from "../utils";
export const deleteImageCaptionText = new fileContentsProcess(async (line) => {
	const targetDeletedImgCaptionStrRegex =
		/<center>(图 |figure )\d-\d-.*?<\/center>/;
	if (targetDeletedImgCaptionStrRegex.test(line)) {
		return "DELETE_LINE";
	}
	return line;
});
export const addImgCaptionText = new fileContentsProcess(
	async (line, metaData, plugin) => {
		const header2Regex = /^##( +).*\n?/m;
		if (header2Regex.test(line)) {
			metaData.imgCaptionNum.value[0]++;
			metaData.imgCaptionNum.value[1] = 0;
			return line;
		}
		const imgCaptionWikiRegex =
			/!\[\[ *(?<backupCaption>.*)\.(?:png|jpg)(?:(?: *\| *)(?<caption>.*?)(?: *))?(?:(?: *\| *)(?:(?:\d+|\d+x\d+)?)(?: *))? *\]\]/;
		const imgCaptionMdRegex =
			/!\[(?: *(?:(?<caption>(?:.| *)*?) *))(?:\|? *(?:\d+|\d+x\d+) *)?\]\((?:(?<backupCaption>.*)\.(?:png|jpg))\)/;

		// If the current line is not the line including image reference link, return it
		if (
			!imgCaptionProcess(imgCaptionWikiRegex, line, metaData, plugin) &&
			!imgCaptionProcess(imgCaptionMdRegex, line, metaData, plugin)
		) {
			return line;
		}
		return (
			imgCaptionProcess(imgCaptionWikiRegex, line, metaData, plugin) ||
			imgCaptionProcess(imgCaptionMdRegex, line, metaData, plugin)
		);
	},
	{
		imgCaptionNum: {
			value: [0, 0],
		},
	}
);
/**
 *
 * @param line
 * @param metaData
 * @param plugin
 * @returns
 */
const imgCaptionProcess = (
	imgLinkRegex: RegExp,
	line: string,
	metaData?: metaData,
	plugin?: nlToolsKit
): string | undefined => {
	let imgCaptionText = "";
	if (imgLinkRegex.test(line)) {
		metaData?.imgCaptionNum.value[1] + 1;
		const match = imgLinkRegex.exec(line);
		/**
		 * 1. caption exists, set file basename ( aaa from  aaa.png ) as caption
		 * 2. caption exists, but acctually scale for image, set filename as caption
		 */
		if (!match?.groups?.caption || /\d+/.test(match?.groups?.caption)) {
			const imgBasenameRegex =
				/(?:(?:(?:.|..)\/)*(?:.*\/)|^)(?<text>.*)/m;
			imgCaptionText = imgBasenameRegex.exec(
				match?.groups?.backupCaption as string
			)?.groups?.text as string;
		} else {
			imgCaptionText = match?.groups?.caption as string;
		}
		return `${line}\n<center>${plugin?.settings.imgCaptionSign} ${metaData?.imgCaptionNum.value[0]}-${metaData?.imgCaptionNum.value[1]}-${imgCaptionText}</center>\n`;
	}
};
