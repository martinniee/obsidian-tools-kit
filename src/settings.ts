// import necessary package : PluginSettingTab、Setting、App
import { PluginSettingTab, Setting, App, SliderComponent } from "obsidian";
// import "nlToolsKit"
import nlToolsKit from "../main";
/**
 * define interface of the setting option
 */
export interface nlToolsKitSettings {
	copyrightInfo: string;
	uniqueId: string;
	imgCaptionSign: string;
	backToTopText: string;
	copyrightInfoDensity: number;
	defautlCopyrightInfoDensity: number;
	heading2NumberingStyle: string;
	enableDebug: boolean;
	enableMardownSection: boolean;
	enableMardownTOC: boolean;
	enableBackToTop: boolean;
	enableImageCaption: boolean;
	enableCalloutCollapseOrExpand: boolean;
}

/**
 * create setting object
 */
export const DEFAULT_SETTINGS: nlToolsKitSettings = {
	//    all setting option
	// <setting option name: value>
	copyrightInfo: "",
	uniqueId: "",
	imgCaptionSign: "图",
	backToTopText: "回到顶部",
	copyrightInfoDensity: 0,
	defautlCopyrightInfoDensity: 0.8,
	heading2NumberingStyle: "数字",
	enableDebug: false,
	enableMardownSection: true,
	enableMardownTOC: true,
	enableBackToTop: true,
	enableImageCaption: false,
	enableCalloutCollapseOrExpand: false,
};
/**
 * create setting tab object
 */
export class nlToolsKitSettingsTab extends PluginSettingTab {
	// set plugin object
	// plugin: <plugin object main.ts >
	plugin: nlToolsKit;
	settingSlider: SliderComponent;

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
		containerEl.createEl("h1", { text: "Tools kit Settings" });

		// Editor context menu item display configure
		new Setting(containerEl)
			.setName("Editor context menu item display configure")
			.setHeading();
		new Setting(containerEl)
			.setName("Markdown Section")
			.setDesc(
				"Whether to add the Markdown Section(Insert/Update and  Delelte) items to editor context menu?"
			)
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.enableMardownSection);
				toggle.onChange(async (option) => {
					this.plugin.settings.enableMardownSection = option;
					await this.plugin.saveSettings();
				});
			});
		new Setting(containerEl)
			.setName("Markdown TOC")
			.setDesc(
				"Whether to add the Markdown TOC(Insert/Update and  Delelte) items to editor context menu?"
			)
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.enableMardownTOC);
				toggle.onChange(async (option) => {
					this.plugin.settings.enableMardownTOC = option;
					await this.plugin.saveSettings();
				});
			});
		new Setting(containerEl)
			.setName("Markdown Back To Top link")
			.setDesc(
				"Whether to add the Markdown BackToTop link(Insert/Update and  Delelte) items to editor context menu?"
			)
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.enableBackToTop);
				toggle.onChange(async (option) => {
					this.plugin.settings.enableBackToTop = option;
					await this.plugin.saveSettings();
				});
			});
		new Setting(containerEl)
			.setName("Markdown Image Caption")
			.setDesc(
				"Whether to add the Markdown Image Caption(Insert/Update and  Delelte) items to editor context menu?"
			)
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.enableImageCaption);
				toggle.onChange(async (option) => {
					this.plugin.settings.enableImageCaption = option;
					await this.plugin.saveSettings();
				});
			});
		new Setting(containerEl)
			.setName("Collapse or Expand callout")
			.setDesc(
				"Whether to add the 'Collapse or Expand callout' items to editor context menu?"
			)
			.addToggle((toggle) => {
				toggle.setValue(
					this.plugin.settings.enableCalloutCollapseOrExpand
				);
				toggle.onChange(async (option) => {
					this.plugin.settings.enableCalloutCollapseOrExpand = option;
					await this.plugin.saveSettings();
				});
			});
		// ------------------------------------------------
		new Setting(containerEl)
			.setName("Editor context menu item configure")
			.setHeading();

		new Setting(containerEl)
			.setName("Copyright Info")
			.setDesc(
				"What you insert into blankline of file as copyright content"
			)
			.addText((text) => {
				text.setPlaceholder("Input copyright info here")
					.setValue(this.plugin.settings.copyrightInfo)
					.onChange(async (value) => {
						this.plugin.settings.copyrightInfo = value;
						await this.plugin.saveSettings();
					});
			});
		new Setting(containerEl)
			.setName("Key name")
			.setDesc(
				"The key name in frontmatter that is added with the MD5 value"
			)
			.addText((text) => {
				text.setPlaceholder("Input key name  here")
					.setValue(this.plugin.settings.uniqueId)
					.onChange(async (value) => {
						this.plugin.settings.uniqueId = value;
						await this.plugin.saveSettings();
					});
			});
		new Setting(containerEl)
			.setName("Image caption name")
			.setDesc("Choose the text as name leading caption description")
			.addDropdown((dropdown) => {
				dropdown.addOption("图", "图");
				dropdown.addOption("Figure", "Figure");
				dropdown.setValue(this.plugin.settings.imgCaptionSign);
				dropdown.onChange(async (option) => {
					this.plugin.settings.imgCaptionSign = option;
					await this.plugin.saveSettings();
				});
			});
		new Setting(containerEl)
			.setName("Back to top display text")
			.setDesc("Choose the text as display text of back-top-link' ")
			.addDropdown((dropdown) => {
				dropdown.addOption("回到顶部", "回到顶部");
				dropdown.addOption("Back-To-Top", "Back-To-Top");
				dropdown.setValue(this.plugin.settings.backToTopText);
				dropdown.onChange(async (option) => {
					this.plugin.settings.backToTopText = option;
					await this.plugin.saveSettings();
				});
			});
		// ============Copyright Info Density=================
		new Setting(containerEl)
			.setName("Copyright Info Density")
			.setDesc(
				`Determine the density of generated copyright info. default as ${this.plugin.settings.defautlCopyrightInfoDensity}. The lower value is,The  denser the  copyright info is.`
			)
			.addSlider((slider) => {
				this.settingSlider = slider;
				slider
					.setLimits(0, 1, "any")
					.setValue(this.plugin.settings.copyrightInfoDensity)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.copyrightInfoDensity = value;
						await this.plugin.saveSettings();
					});
			});
		new Setting(containerEl)
			.setName("Reset to default")
			.setDesc("Default is 0.8")
			.addButton((button) => {
				button.setButtonText("Reset").onClick(() => {
					this.settingSlider.setValue(
						this.plugin.settings.copyrightInfoDensity
					);
					this.settingSlider.onChange(async () => {
						this.plugin.settings.copyrightInfoDensity =
							this.plugin.settings.defautlCopyrightInfoDensity;
						await this.plugin.saveSettings();
					});
				});
			});
		new Setting(containerEl)
			.setName("Heading 2 level numbering style")
			.setDesc("Choose the style for numbering heading 2 level ")
			.addDropdown((dropdown) => {
				dropdown.addOption("数字", "数字");
				dropdown.addOption("汉字", "汉字");
				dropdown.setValue(this.plugin.settings.heading2NumberingStyle);
				dropdown.onChange(async (option) => {
					this.plugin.settings.heading2NumberingStyle = option;
					await this.plugin.saveSettings();
				});
			});
		new Setting(containerEl).setName("Debug").setHeading();

		new Setting(containerEl)
			.setName("Debug mode")
			.setDesc(
				"Turns on console.log for plugin events. This is useful for troubleshooting."
			)
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.enableDebug);
				toggle.onChange(async (option) => {
					this.plugin.settings.enableDebug = option;
					await this.plugin.saveSettings();
				});
			});
	}
}
