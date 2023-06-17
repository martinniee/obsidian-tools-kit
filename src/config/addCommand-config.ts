import { addBackToTopLink, deleteBackToTopLink } from './../options/addBackToTopLink';
import { copyMainContentToClipboard } from "src/options/copyMainContentsAndWriteToClipboard";
import nlToolsKit from "../../main";
import { copyMainContentWithAddedB2PLinkToClipboard } from "../options/addBackToTopLinkForJuejin";
import { resolveFrontmatterLinkTextAsLink } from "../options/resolveFronmatterLinkAsExternalLink";
import { insertCopyright } from "src/options/insertCopyrightToBlankline";
import { addUniqueIdToFrontmatterField } from "src/options/genUniqueIdForNote";
import { addImgCaptionText } from "src/options/addImgCaptionText";
import { insertToc } from "src/options/generateTOC";
import { numberingHeadings } from "src/options/numberingHeadings";

export const addCommand = (plugin: nlToolsKit) => {
	// --------Back-to-top link--------
	plugin.addCommand({
		id: "01-add-back-to-top-link-clear",
		name: "添加——回到顶部链接（back2top）",
		callback: async () => {
			await addBackToTopLink.process(plugin);
		},
	});
	plugin.addCommand({
		id: "02add-back-to-top-link",
		name: "清除——回到顶部链接（back2top）",
		callback: () => {
			deleteBackToTopLink.process(plugin);
		},
	});
	// --------Copy content added btp link for juejin to clipboard--------
	plugin.addCommand({
		id: "03-add-back-to-top-link-for-juejin",
		name: "复制已添加“回到顶部”链接文档的内容到剪切板（针对掘金平台）",
		callback: async () => {
			copyMainContentWithAddedB2PLinkToClipboard();
		},
	});
	// --------Resolve frontmatter link as Link--------
	plugin.addCommand({
		id: "04-resolve-frontmatter-as-link",
		name: "解析渲染frontmatter外部链接文本为可点击访问的链接（仅阅读模式）",
		callback: () => {
			resolveFrontmatterLinkTextAsLink();
		},
	});
	// --------Copy main body of note to clipboard--------
	plugin.addCommand({
		id: "06-copy-main-body-of-note-and-write-to-clipboard",
		name: "复制正文（不包括yaml区）的内容到剪切板",
		callback: async () => {
			copyMainContentToClipboard();
		},
	});
	// --------insert toc in markdown style--------
	plugin.addCommand({
		id: "07-insert-toc-in-markdown-style",
		name: "添加mardown风格的toc（table of content）",
		callback: async () => {
			insertToc();
		},
	});
	// --------Insert copyright to blankline --------
	plugin.addCommand({
		id: "07-insert-copyright-to-blankline",
		name: "添加版权信息到文档中空行（copyright）",
		callback: async () => {
			insertCopyright(plugin);
		},
	});
	// --------Generate unique id for file from file name with md5 --------
	plugin.addCommand({
		id: "08-generate-uniqute-id-for-file-from-file-name-with-md5",
		name: "根据文件名给指定字段生成MD5唯一id",
		callback: async () => {
			addUniqueIdToFrontmatterField(plugin);
		},
	});
	// --------Add image caption text --------
	plugin.addCommand({
		id: "09-add-image-caption-text",
		name: "添加图注文本（caption）",
		callback: async () => {
			addImgCaptionText(plugin);
		},
	});
	// ------- Numbering headings --------
	plugin.addCommand({
		id: "10-numbering-headings",
		name: "编号所有标题（headings）",
		callback: async () => {
			numberingHeadings.process();
		},
	});
};
