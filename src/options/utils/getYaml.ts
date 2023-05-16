import { getMainContent } from './getMainContent';
import { getContentsArr } from './getContentsAsArr';

/**
 * Get the frontmatter from markdown contents
* 
 * @param contents  The entire contents
 * @returns 
 */
export const getYaml = (contents: string): string => {
    const frontmatterString = contents.split('---')[1].trim();
    const yaml = `---\n${frontmatterString}\n---`
    return yaml;
}
export const getYamlEndtIndex = async (): Promise<number> => {
    let contents = await getContentsArr();
    let mainContents = (await getMainContent()).split('\n');
    return contents.length - mainContents.length;
}