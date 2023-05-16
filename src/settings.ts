// import necessary package : PluginSettingTab、Setting、App
import { PluginSettingTab, Setting, App } from 'obsidian';
// import "nlToolsKit"
import nlToolsKit from "../main";
/**
 * define interface of the setting option
 */
export interface nlToolsKitSettings {
    copyrightInfo: string
}

/**
 * create setting object
 */
export const DEFAULT_SETTINGS: nlToolsKitSettings = {
    //    all setting option
    // <setting option name: value>
    copyrightInfo: '',

};
/**
 * create setting tab object
 */
export class nlToolsKitSettingsTab extends PluginSettingTab {

    // set plugin object
    // plugin: <plugin object main.ts >
    plugin: nlToolsKit;

    /**
     * Constructor to create Plugin nlToolsKitSettingsTab
     * @param app 
     * @param plugin 
     */
    constructor(app: App, plugin: nlToolsKit) {
        super(app, plugin);
        this.plugin = plugin;
    }

    /**
     * Show setting option modal
     */
    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Tools kit Settings' });

        new Setting(containerEl)
            .setName('CopyrightInfo Setting')
            .setDesc('What you insert into blankline of file as copyright content')
            .addText((text) => {
                text
                    .setPlaceholder('Input copyright info here')
                    .setValue(this.plugin.settings.copyrightInfo)
                    .onChange(async (value) => {
                        this.plugin.settings.copyrightInfo = value;
                        await this.plugin.saveSettings();
                    })
            });
    }
}