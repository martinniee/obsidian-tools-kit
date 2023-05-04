
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