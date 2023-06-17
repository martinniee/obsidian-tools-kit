import nlToolsKit from 'main';
import { TFile } from "obsidian";
import { genenerateUniqueId, getMainContent, getYamlArr } from 'src/utils';

const generateUniqueIdForNote = () => {
    const activeFile: TFile = app.workspace.getActiveFile() as TFile;
    const filename = activeFile.basename;
    return genenerateUniqueId(filename);
}

export const addUniqueIdToFrontmatterField = async (plugin: nlToolsKit) => {
    const activeFile: TFile = app.workspace.getActiveFile() as TFile;
    let content = '';
    const filenameMD5 = generateUniqueIdForNote();
    let isUniqueIdExist = false;
    const uniqueIdField = plugin.settings.uniqueId;
    const frontmatter = await getYamlArr();
    // when frontmatter does not exist
    if (!frontmatter.length) {
        content = `---\n${uniqueIdField}: ${filenameMD5}\n---\n`;
        app.vault.adapter.write(activeFile.path, content);
        return;
    }
    frontmatter.forEach((field) => {
        if (field[0] === uniqueIdField) {
            isUniqueIdExist = true;
            field[1] = filenameMD5;
        }
    });
    if (!isUniqueIdExist) {
        frontmatter.push([uniqueIdField, `${filenameMD5}`])
    }
    let yamlsStr = frontmatter.map((field) => field.join(": ")).join('\n');
    yamlsStr = `---\n${yamlsStr}\n---\n`;
    const contentsStr = await getMainContent();
    content = yamlsStr + contentsStr;
    app.vault.adapter.write(activeFile.path, content);
}