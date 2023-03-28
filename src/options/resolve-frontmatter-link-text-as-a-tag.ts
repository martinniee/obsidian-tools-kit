
/**
 * Resolve frontmatter link text as clickable link
 */
export const resolveFrontmatterLinkTextAsClickableLink = () => {
    const frontmatter: HTMLDivElement = document.getElementsByClassName('frontmatter-container')[0] as HTMLDivElement;
    const sectionList: HTMLCollection = frontmatter?.getElementsByClassName('frontmatter-section') as HTMLCollection;
    if (!sectionList || !sectionList.length) {
        return;
    }
    // const sectionArray: Element[] = Array.from(sectionList);
    for (let i = 0; i < sectionList.length; i++) {
        const a: HTMLAnchorElement = createEl('a');
        // document.getElementsByClassName('frontmatter-container')[0].getElementsByClassName('frontmatter-section')[4].children[1].children[0]
        // 1. get section_data
        const section_data: HTMLDivElement = sectionList[i].children[1] as HTMLDivElement;
        // 2. get section_data_item copy
        const section_data_item_copy: HTMLSpanElement = section_data?.children[0] as HTMLSpanElement;
        // 3. get link text
        const url: string = section_data_item_copy?.innerText;
        // item: frontmatter-section-data-item
        const isMatchHyperLink: boolean = url.match(/https?:\/\/(.*\/?)+/gm) !== null;
        // if match hyper link
        if (isMatchHyperLink) {
            //    4. remove section_data_item
            section_data.removeChild(section_data.children[0]);
            // 5. create a tag and set attribute href filled with url
            const a = document.createElement('a');

            a.setAttribute('href', url as string);
            a.setAttribute('class', 'external-link');
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener');

            // 6. append new clickable section_data_item
            a.appendChild(section_data_item_copy);
            section_data.appendChild(a);

        } else {
            continue;
        }

    }
}
