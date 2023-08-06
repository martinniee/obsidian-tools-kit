export const startMardownCodefencesymbol = /^ *```.*$/m;
export const endMardownCodefencesymbol = /^ *``` *$/m;
const calloutMark = [
	"note",
	"abstract",
	"summary",
	"tldr",
	"info",
	"todo",
	"tip",
	"hint",
	"important",
	"success",
	"check",
	"done",
	"question",
	"help",
	"faq",
	"warning",
	"caution",
	"attention",
	"failure",
	"fail",
	"missing",
	"danger",
	"error",
	"bug",
	"example",
	"quote",
	"cite",
];
export const calloutSymbolRegex = new RegExp(
	`(^.*\\[!(?:${calloutMark.join("|")})[^\\\\\n]*\\])(?<folderSymbol>(?:\\+|-))(.*$)`,
	"im"
);
