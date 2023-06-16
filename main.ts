// import necessary package : App、Editor, MarkdownView, Modal, Notice, Plugin
import { Plugin, MarkdownView } from 'obsidian';

// import "nlToolsKitSettings、 DEFAULT_SETTINGS"
import { nlToolsKitSettings, DEFAULT_SETTINGS } from "./src/settings";
// import "nlToolsKitSettingsTab" , 
import { nlToolsKitSettingsTab } from "./src/settings";

import { resolveFrontmatterLinkTextAsLink } from "./src/options/resolveFronmatterLinkAsExternalLink";
import { addCommand } from "./src/config/addCommand-config";
import { addContextMenus } from 'src/config/addMenus';

interface Listener {

	(this: Document, ev: Event): any;
}

/**
 * Create plugin object
 */
export default class MyPlugin extends Plugin {
	// set plugin setting object
	// setings: <settings object  in settings.ts>
	settings: nlToolsKitSettings;

	/**
	 * when plugin onload
	 */
	async onload() {
		console.log("-----------Tools Kit plugin loaded...-----------");
		await this.loadSettings();
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new nlToolsKitSettingsTab(this.app, this));


		// when editor change ,run resolveFrontmatterLinkTextAsLink
		this.registerEvent(app.workspace.on('file-open', () => {
			let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView) {
				let viewState = activeView.getMode() as string;
				if (viewState && viewState === 'preview') {
					resolveFrontmatterLinkTextAsLink();
				}
			}
		}))
		this.registerEvent(app.workspace.on('layout-change', () => {
			let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView) {
				let viewState = activeView.getMode() as string;
				if (viewState && viewState === 'preview') {
					resolveFrontmatterLinkTextAsLink();
				}
			}
		}))
		this.registerEvent(app.workspace.on('active-leaf-change', () => {
			resolveFrontmatterLinkTextAsLink();
		}))
		// register all 'add command' commands from   addCommand-config.ts
		addCommand(this);
		// register all 'add command' commands from   addCommand-config.ts
		addContextMenus(this);

	}
	/**
	 * 
	 * @param el 
	 * @param event 
	 * @param selector 
	 * @param listener 
	 * @param options 
	 * @returns 
	 */
	onElement(
		el: Document,
		event: keyof HTMLElementEventMap,
		selector: string,
		listener: Listener,
		options?: { capture?: boolean }
	) {
		el.on(event, selector, listener, options);
		return () => el.off(event, selector, listener, options);
	}


	/**
	 * when plugin onunload
	 */
	onunload() {
		console.log("-----------Tools Kit plugin onunload...-----------");

	}
	/**
	 * load setings from  settings file  (data.json)
	 */
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	/**
	 * save the configuration in setting option modal
	 */
	async saveSettings() {
		await this.saveData(this.settings);
	}

}