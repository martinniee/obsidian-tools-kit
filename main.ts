// import necessary package : App、Editor, MarkdownView, Modal, Notice, Plugin
import { App, Plugin, TFile, MarkdownView } from 'obsidian';

// import "MyPluginSettings、 DEFAULT_SETTINGS"
import { MyPluginSettings, DEFAULT_SETTINGS } from "./src/settings";
// import "MyPluginSettingsTab" , 
import { MyPluginSettingsTab } from "./src/settings";

import { clearBackToTopLink, addBackToTopLinkForOtherHeaders } from "./src/options/add-back-to-top-link";
import { addBackToTopLinkForJuejin, copyContentToClipboard } from "./src/options/add-back-to-top-link-for";

import { resolveAsLink } from "./src/options/resolve-frontmatter-link-text-as-external-link";

interface Listener {

	(this: Document, ev: Event): any;
}


/**
 * Create plugin object
 */
export default class MyPlugin extends Plugin {
	// set plugin setting object
	// setings: <settings object  in settings.ts>
	settings: MyPluginSettings;

	/**
	 * when plugin onload
	 */
	async onload() {
		console.log("-----------Tools Kit plugin loaded...-----------");
		await this.loadSettings();
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MyPluginSettingsTab(this.app, this));


		// when editor change ,run resolveAsLink
		this.registerEvent(app.workspace.on('file-open', () => {
			let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView) {
				let viewState = activeView.getMode() as string;
				if (viewState && viewState === 'preview') {
					resolveAsLink();
				}
			}
		}))
		this.registerEvent(app.workspace.on('layout-change', () => {
			let activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (activeView) {
				let viewState = activeView.getMode() as string;
				if (viewState && viewState === 'preview') {
					resolveAsLink();
				}
			}
		}))
		this.registerEvent(app.workspace.on('active-leaf-change', () => {
			resolveAsLink();
		}))
		// --------Back-to-top link--------
		this.addCommand({
			id: 'add-back-to-top-link-clear',
			name: 'Add Back-to-top link',
			callback: () => {
				addBackToTopLinkForOtherHeaders();

			}
		});
		this.addCommand({
			id: 'add-back-to-top-link',
			name: 'Clear Back-to-top link',
			callback: () => {
				clearBackToTopLink();

			}
		});
		// --------Copy content added btp link for juejin to clipboard--------
		this.addCommand({
			id: 'add-back-to-top-link-for-juejin',
			name: 'Copy content added btp link for juejin to clipboard',
			callback: async () => {
				copyContentToClipboard(await addBackToTopLinkForJuejin());
			}
		});
		// --------Resolve frontmatter link as Link--------
		this.addCommand({
			id: 'resolve-frontmatter-as-link',
			name: 'Resolve frontmatter link as Link',
			callback: () => {
				resolveAsLink();

			}
		});
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