// import necessary package : PluginSettingTab、Setting、App
import { PluginSettingTab, Setting, App } from 'obsidian';
// import "MyPlugin"
import MyPlugin from "../main";
/**
 * define interface of the setting option
 */
export interface MyPluginSettings {
    // <setting option name: type>
}

/**
 * create setting object
 */
export const DEFAULT_SETTINGS: MyPluginSettings = {
    //    all setting option
    // <setting option name: value>

};
/**
 * create setting tab object
 */
export class MyPluginSettingsTab extends PluginSettingTab {

    // set plugin object
    // plugin: <plugin object main.ts >
    plugin: MyPlugin;

    /**
     * Constructor to create Plugin MyPluginSettingsTab
     * @param app 
     * @param plugin 
     */
    constructor(app: App, plugin: MyPlugin) {
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

        /* new Setting(containerEl)
            .setName('Deleted Attachment Destination')
            .setDesc('Select where you want Attachments to be moved once they are deleted')
            .addDropdown((dropdown) => {
                dropdown.addOption('permanent', 'Delete Permanently');
                dropdown.addOption('.trash', 'Move to Obsidian Trash');
                dropdown.addOption('system-trash', 'Move to System Trash');
                dropdown.setValue(this.plugin.settings.deleteOption);
                dropdown.onChange((option) => {
                    this.plugin.settings.deleteOption = option;
                    this.plugin.saveSettings();
                });
            }); */
    }
}