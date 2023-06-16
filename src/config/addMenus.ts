import {
	numberingHeadings,
	removeHeadingNum,
} from "./../options/numberingHeadings";
import { Editor, ItemView, MarkdownView, Menu } from "obsidian";
import nlToolsKit from "../../main";
import { insertToc, removeToc } from "src/options/generateTOC";
export const addContextMenus = (__this: nlToolsKit) => {
	__this.registerEvent(
		__this.app.workspace.on(
			"editor-menu",
			(menu: Menu, _: Editor, view: MarkdownView) => {
				menu.addItem((item) => {
					item.setTitle("Markdown Sections: Insert/Update")
						.setIcon("list-ordered")
						.onClick(async () => {
							await numberingHeadings.process();
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
							console.log(1111111111);
							await insertToc();
							console.log(22222222222);
						});
				});
				menu.addItem((item) => {
					item.setTitle("Mardown TOC: Delete")
						.setIcon("list")
						.onClick(async () => {
							await removeToc.process();
						});
				});
			}
		)
	);
};
