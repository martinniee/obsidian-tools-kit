import { copyMainContentToClipboard } from "src/options/copyMainContentsAndWriteToClipboard";
import nlToolsKit from "../../main";
import { copyMainContentWithAddedB2PLinkToClipboard } from "../options/addBackToTopLinkForJuejin";
import { resolveFrontmatterLinkTextAsLink } from "../options/resolveFronmatterLinkAsExternalLink";
import { insertCopyright } from "src/options/insertCopyrightToBlankline";
import { addUniqueIdToFrontmatterField } from "src/options/genUniqueIdForNote";
import {
	collapseCallout,
	expandCallout,
} from "src/options/collapseExpandCallout";

export const addCommand = (plugin: nlToolsKit) => {
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
	// Collapse or Expand callout
	plugin.addCommand({
		id: "collapse all expanded callouts",
		name: "一键折叠所有展开的callout",
		callback: async () => {
			await collapseCallout.process(plugin);
		},
	});
	plugin.addCommand({
		id: "expand all collapsed callouts",
		name: "一键展开所有折叠的callout",
		callback: async () => {
			await expandCallout.process(plugin);
		},
	});
};
