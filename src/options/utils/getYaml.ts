import { getMainContent, isContainsFrontmatter } from './getMainContent';
import { getContentsArr } from './getContentsAsArr';

/**
 * Get the frontmatter from markdown contents
* 
 * @param contents  The entire contents
 * @returns 
 */
export const getYaml = async (): Promise<string> => {
    const contents = (await getContentsArr()).join('\n');
    const isFrontmatterExsit = await isContainsFrontmatter();
    if (isFrontmatterExsit) {
        const frontmatterString = contents.split('---')[1]?.trim();
        const yaml = `---\n${frontmatterString}\n---`
        return yaml;
    } else {
        return '';
    }

}
export const getYamlArr = async (): Promise<string[][]> => {
    const arr = (await getYaml()).split('\n');
    if (!arr.length) return []
    const fields = arr.filter((item) => { return item != '---'; })
    const fontmatter = fields.map((field) => { return field.split(':'); })
    return fontmatter;
}
export const getYamlEndtIndex = async (): Promise<number> => {
    let contents = await getContentsArr();
    let mainContents = (await getMainContent()).split('\n');
    return contents.length - mainContents.length;
}