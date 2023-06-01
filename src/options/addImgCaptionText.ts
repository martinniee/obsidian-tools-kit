import nlToolsKit from 'main';
import { getContentsArr } from './utils/getContentsAsArr';
import { TFile } from "obsidian";

const Header2Regex = /^## .*\n?/g;
const imgCaptionWikiRegex = /!\[\[.*\.(png|jpg)(\s+)?(\|([^\d]+))?\]\]/g;
const imgCaptionMdRegex = /!\[(.*?)\]\(.*\.(jpg|png)\)/g;
const imgCaptionStrRegex = /(图|figure) \d-\d-.*?/g;

export const addImgCaptionText = async (plugin: nlToolsKit) => {
    const imgCaptionSign = plugin.settings.imgCaptionSign;
    const activeFile: TFile = app.workspace.getActiveFile() as TFile;
    // removing all existed image caption texts before adding to 
    await removeAllImgCaptionText(activeFile);
    const fileContents = await getContentsArr();
    const newFileContents: string[] = [];

    let imgCaptionNum1 = 0; // chapter number,default is 0, increment by 1 when the line is header2 level
    let imgCaptionNum2 = 0; // image number ,default is 0, increment by 1 when coming across image reference link line
    // iterate
    for (const line of fileContents) {
        // resetting all the lastIndex value to 0
        imgCaptionMdRegex.lastIndex = 0;
        imgCaptionWikiRegex.lastIndex = 0;
        Header2Regex.lastIndex = 0;

        if (Header2Regex.test(line)) {
            imgCaptionNum1++;
            imgCaptionNum2 = 0;
            newFileContents.push(line);
            continue;
        }
        else if (imgCaptionWikiRegex.test(line)) {
            imgCaptionNum2++;
            imgCaptionWikiRegex.lastIndex = 0;
            const match = imgCaptionWikiRegex.exec(line);
            if (match) {
                const imgCaption = match[4].trim();
                const imgCaptionText = `${imgCaptionSign} ${imgCaptionNum1}-${imgCaptionNum2}-${imgCaption}`;
                newFileContents.push(`${line}\n${imgCaptionText}`);
                continue;
            } else {
                newFileContents.push(line);
                continue;
            }
        }
        else if (imgCaptionMdRegex.test(line)) {
            imgCaptionNum2++;
            imgCaptionMdRegex.lastIndex = 0;
            const match = imgCaptionMdRegex.exec(line);
            if (match) {
                const imgCaption = match[1].trim();
                const imgCaptionText = `${imgCaptionSign} ${imgCaptionNum1}-${imgCaptionNum2}-${imgCaption}`;
                newFileContents.push(`${line}\n${imgCaptionText}`);
                continue;
            } else {
                newFileContents.push(line);
                continue;
            }
        } else {
            newFileContents.push(line);
            continue;
        }
    }
    app.vault.adapter.write(activeFile.path, newFileContents.join("\n"));
}

export const removeAllImgCaptionText = async (activeFile: TFile) => {
    const fileContents = await getContentsArr()
    let newFileContents: string[] = [];
    newFileContents = fileContents.map((line) => {
        imgCaptionStrRegex.lastIndex = 0;
        const match = imgCaptionStrRegex.exec(line);
        if (match) {
            return "delete imgCaption";
        } else {
            return line;
        }
    }).filter(i => i != "delete imgCaption") as string[];
    app.vault.adapter.write(activeFile.path, newFileContents.join("\n"));
}