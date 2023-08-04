import {
	calloutSymbolRegex,
	endMardownCodefencesymbol,
	startMardownCodefencesymbol,
} from "src/config/regex";
import { fileContentsProcess } from "src/utils";

export const collapseCallout = new fileContentsProcess((lines) => {
	let isIncode = false;
	for (let i = 0; i < lines.length; i++) {
		// Skip the situation that heading within code fencce
		if (lines[i].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (lines[i].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		if (lines[i].match(calloutSymbolRegex) && !isIncode) {
			lines[i] = lines[i].replace(calloutSymbolRegex, "$1-$3");
		} else {
			continue;
		}
	}
	return lines;
});

export const expandCallout = new fileContentsProcess((lines) => {
	let isIncode = false;
	for (let i = 0; i < lines.length; i++) {
		// Skip the situation that heading within code fencce
		if (lines[i].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (lines[i].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		if (lines[i].match(calloutSymbolRegex) && !isIncode) {
			lines[i] = lines[i].replace(calloutSymbolRegex, "$1+$3");
		} else {
			continue;
		}
	}
	return lines;
});
