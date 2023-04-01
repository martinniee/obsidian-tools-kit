import { Notice } from "obsidian";

/**
 * 
 * Resolve frontmatter_container link text as clickable link
 */
export const resolveFrontmatterLinkTextAsLink = () => {
    // active leaf
    const active_leaf = document.querySelector('.workspace-leaf.mod-active');

    // reading view
    const reading_view = active_leaf?.querySelector('.markdown-reading-view');

    // if reading_view equals undefined ,which means current mode is not reading view
    if (reading_view === undefined) {
        new Notice("current is not in reading view");
        return;
    }
    // frontmatter-container 
    const frontmatter_container = reading_view?.querySelector('.frontmatter-container ');
    // all the frontmatter-section
    const frontmatter_section_list = frontmatter_container?.getElementsByClassName('frontmatter-section');
    if (frontmatter_section_list === undefined) { return }
    // iterate  frontmatter_section_list
    for (let i = 0; i < frontmatter_section_list.length; i++) {
        // frontmatter-section-data
        // if current element contains class attribute value "mod-tags",then skip
        if (frontmatter_section_list[i].classList.contains("mod-tags")) continue;
        const frontmatter_section_data = frontmatter_section_list[i].querySelector('.frontmatter-section-data');
        //  frontmatter-section-data-item
        const data_item = frontmatter_section_data?.querySelector('.frontmatter-section-data-item');

        const url: string = data_item?.getText() as string;
        const isMatchHyperLink: boolean = url.match(/https?:\/\/(.*\/?)+/gm) !== null;

        if (isMatchHyperLink) {
            if (data_item !== undefined && frontmatter_section_data?.contains(data_item)) {
                const child = frontmatter_section_data.childNodes[0];
                frontmatter_section_data?.removeChild(child);
            }
            // construct an  a tag containing span.frontmatter-section-data-item element
            const span = document.createElement('span');
            span.setAttribute('class', 'frontmatter-section-data-item');
            span.setText(url);
            const a_link = document.createElement('a');
            a_link.setAttribute('href', url as string)
            a_link.setAttribute('class', 'external-link');
            a_link.appendChild(span);
            // ------------------------------------
            // contruct frontmatter-section-data containing the a tag
            frontmatter_section_data?.appendChild(a_link);
        } else { continue }
    }
}

