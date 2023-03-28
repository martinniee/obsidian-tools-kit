import { TFile, Notice } from 'obsidian';

/**
 * 
 */
export const SetLineEndWithQMarkToH2Title = async () => {

    // get note content
    const activeMd: TFile = app.workspace.getActiveFile() as TFile;
    // original note content 
    const origin_filecontents = await app.vault.read(activeMd);
    const new_filecontents: string[] = [];
    const fileContents_array = origin_filecontents.split("\n");

    let countNumOflineEndWithQMark = 0;
    //  iterate all lines of current note 
    for (let line of fileContents_array) {
        // match h2/3/4/5/6 header
        const isMatchLineEndWithQMark: Boolean = line.match(/(^.*(\?|？)$)/gm) !== null;
        // if match 
        if (isMatchLineEndWithQMark) {
            new_filecontents.push(line.replace(/(^.*(\?|？)$)/, '## $1'));
            countNumOflineEndWithQMark++;
        } else {
            new_filecontents.push(line);
        }
    }
    if (countNumOflineEndWithQMark! < 0) {
        new Notice("no line end with question mark found!")
    }
    // write processed content to activeMd
    app.vault.adapter.write(activeMd.path, new_filecontents.join("\n"));
}