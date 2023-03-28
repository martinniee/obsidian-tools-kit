
// import necessary package: Modal、App
import { Modal, App } from 'obsidian';

export class ToolsKitModal extends Modal {
    /**
     * Constructor to create modal 
     * @param app 
     */

    constructor(app: App) {
        super(app);
    }
    /**
     * When open modal 
     */
    onOpen() {
        const { contentEl } = this;
        contentEl.setText('Woah!');
    }
    /**
     * When close modal
     */
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
