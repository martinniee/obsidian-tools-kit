import nlToolsKit from "main";
import { deleteArrayElement, fileContentsProcess, processFunc } from "../utils";
import {
	endMardownCodefencesymbol,
	startMardownCodefencesymbol,
} from "src/config/regex";
export const deleteImageCaptionText = new fileContentsProcess((lines) => {
	let isIncode = false;
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (lines[i].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		const targetDeletedImgCaptionStrRegex =
			/<center>(图 |Figure )\d+-\d+-.*?<\/center>/;
		if (lines[i].match(targetDeletedImgCaptionStrRegex) && !isIncode) {
			lines = deleteArrayElement(lines, i);
		}
	}
	return lines;
});
export const addImgCaptionText = new fileContentsProcess((lines, plugin) => {
	let imgCaptionNum = [0, 0];
	let isIncode = false;
	for (let i = 0; i < lines.length; i++) {
		// Skip the situation that target within code fencce
		if (lines[i].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (lines[i].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		const header2Regex = /^##( +).*\n?/m;
		if (lines[i].match(header2Regex) && !isIncode) {
			imgCaptionNum[0]++;
			imgCaptionNum[1] = 0;
		}
		const imgCaptionWikiRegex =
			/!\[\[ *(?<backupCaption>.*)\.(?:png|jpg)(?:(?: *\| *)(?<caption>.*?)(?: *))?(?:(?: *\| *)(?:(?:\d+|\d+x\d+)?)(?: *))? *\]\]/;
		const imgCaptionMdRegex =
			/!\[(?: *(?:(?<caption>(?:.| *)*?) *))(?:\|? *(?:\d+|\d+x\d+) *)?\]\((?:(?<backupCaption>.*)\.(?:png|jpg))\)/;
		// If the current line is not the line including image reference link, skip it

		if (
			!isIncode &&
			(lines[i].match(imgCaptionMdRegex) ||
				lines[i].match(imgCaptionWikiRegex))
		) {
			lines[i] =
				imgCaptionProcess(
					imgCaptionWikiRegex,
					lines[i],
					imgCaptionNum,
					plugin
				) ||
				imgCaptionProcess(
					imgCaptionMdRegex,
					lines[i],
					imgCaptionNum,
					plugin
				);
		} else {
			continue;
		}
	}
	return lines;
});
const imgCaptionProcess = (
	imgLinkRegex: RegExp,
	line: string,
	imgCaptionNum: number[],
	plugin?: nlToolsKit
): string => {
	let imgCaption = "";
	let imgCaptionText = "";
	if (line.match(imgLinkRegex)) {
		const section = imgCaptionNum[0];
		imgCaptionNum[1]++;
		const num = imgCaptionNum[1];
		const matchCaption = line.match(imgLinkRegex)?.groups
			?.caption as string;
		/**
		 * 1. caption exists, set file basename ( aaa from  aaa.png ) as caption
		 * 2. caption exists, but acctually scale for image, set filename as caption
		 */
		if (!matchCaption || matchCaption.match(/\d+/)) {
			const imgBasenameRegex =
				/(?:(?:(?:.|..)\/)*(?:.*\/)|^)(?<text>.*)/m;
			const matchBackupCaption = line.match(imgLinkRegex)?.groups
				?.backupCaption as string;
			imgCaptionText = matchBackupCaption.match(imgBasenameRegex)?.groups
				?.text as string;
		} else {
			imgCaptionText = matchCaption;
		}
		imgCaption = `${line}\n<center>${plugin?.settings.imgCaptionSign} ${section}-${num}-${imgCaptionText}</center>\n`;
	}
	return imgCaption;
};
