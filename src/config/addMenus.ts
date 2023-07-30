import {
	numberingHeadings,
	removeHeadingNum,
} from "./../options/numberingHeadings";
import { Editor, MarkdownView, Menu } from "obsidian";
import nlToolsKit from "../../main";
import { insertToc, removeToc } from "src/options/generateTOC";
import {
	addBackToTopLink,
	deleteBackToTopLink,
} from "src/options/addBackToTopLink";
import {
	addImgCaptionText,
	deleteImageCaptionText,
} from "src/options/addImgCaptionText";
import {
	insertCopyright,
	removeCopyright,
} from "src/options/insertCopyrightToBlankline";
export const addContextMenus = (plugin: nlToolsKit) => {
	plugin.registerEvent(
		plugin.app.workspace.on(
			"editor-menu",
			(menu: Menu, _: Editor, view: MarkdownView) => {
				menu.addItem((item) => {
					item.setTitle("Markdown Sections: Insert/Update")
						.setIcon("list-ordered")
						.onClick(async () => {
							await removeHeadingNum.process();
							await numberingHeadings.process(
								plugin as nlToolsKit
							);
						});
				});
				menu.addItem((item) => {
					item.setTitle("Markdown Sections: Delete")
						.setIcon("list-ordered")
						.onClick(async () => {
							await removeHeadingNum.process();
						});
				});
				// Markdown TOC
				menu.addItem((item) => {
					item.setTitle("Markdown TOC: Insert/Update")
						.setIcon("list")
						.onClick(async () => {
							await removeToc.process();
							await insertToc();
						});
				});
				menu.addItem((item) => {
					item.setTitle("Markdown TOC: Delete")
						.setIcon("list")
						.onClick(async () => {
							await removeToc.process();
						});
				});
				// Back TO Top
				menu.addItem((item) => {
					item.setTitle("Back To Top: Insert/Update")
						.setIcon("corner-right-up")
						.onClick(async () => {
							await deleteBackToTopLink.process(
								plugin as nlToolsKit
							);
							await addBackToTopLink.process(plugin);
						});
				});
				menu.addItem((item) => {
					item.setTitle("Back To Top: Delete")
						.setIcon("corner-right-up")
						.onClick(async () => {
							await deleteBackToTopLink.process(
								plugin as nlToolsKit
							);
						});
				});
				// Image Caption
				menu.addItem((item) => {
					item.setTitle("Image Caption: Insert/Update")
						.setIcon("subtitles")
						.onClick(async () => {
							await deleteImageCaptionText.process(plugin);
							await addImgCaptionText.process(plugin);
						});
				});
				menu.addItem((item) => {
					item.setTitle("Image Caption: Delete")
						.setIcon("subtitles")
						.onClick(async () => {
							await deleteImageCaptionText.process(plugin);
						});
				});
				// Copyright Info
				menu.addItem((item) => {
					item.setTitle("Copyright Info: Insert/Update")
						.setIcon("subtitles")
						.onClick(async () => {
							await removeCopyright.process(plugin);
							await insertCopyright(plugin);
							/* await deleteImageCaptionText.process(plugin);
							await addImgCaptionText.process(plugin); */
						});
				});
				menu.addItem((item) => {
					item.setTitle("Copyright Info: Delete")
						.setIcon("subtitles")
						.onClick(async () => {
							await removeCopyright.process(plugin);
						});
				});
			}
		)
	);
};
