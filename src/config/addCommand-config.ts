import { getContentsArr } from './../options/utils/getContentsAsArr';
import { getMainContent } from './../options/utils/getMainContent';
import { copyMainContentToClipboard } from "src/options/copy-main-body-of-note-and-write-to-clipboard";
import { generateTableOfContents } from "src/options/generate-toc-from-content";
import { copyContentToClipboard } from "src/options/utils/copyContentToClipboard";
import nlToolsKit from "../../main";
import { addBackToTopLinkForOtherHeaders, clearBackToTopLink } from "../options/add-back-to-top-link";
import { copyMainContentWithAddedB2PLinkToClipboard } from "../options/add-back-to-top-link-for";
import { resolveFrontmatterLinkTextAsLink } from "../options/resolve-frontmatter-link-text-as-external-link";
import { getYaml } from 'src/options/utils/getYaml';
import { insertCopyright } from 'src/options/insertCopyrightToBlankline';
import { addUniqueIdToFrontmatterField } from 'src/options/genUniqueIdForNote';
import { addImgCaptionText } from 'src/options/addImgCaptionText';


export const addCommand = (plugin: nlToolsKit) => {
    // --------Back-to-top link--------
    plugin.addCommand({
        id: '01-add-back-to-top-link-clear',
        name: '添加——回到顶部链接（根据h1标题）',
        callback: () => {
            addBackToTopLinkForOtherHeaders();

        }
    });
    plugin.addCommand({
        id: '02add-back-to-top-link',
        name: '清除——回到顶部链接（根据h1标题）',
        callback: () => {
            clearBackToTopLink();

        }
    });
    // --------Copy content added btp link for juejin to clipboard--------
    plugin.addCommand({
        id: '03-add-back-to-top-link-for-juejin',
        name: '复制已添加“回到顶部”链接文档的内容到剪切板（针对掘金平台）',
        callback: async () => {
            copyMainContentWithAddedB2PLinkToClipboard();
        }
    });
    // --------Resolve frontmatter link as Link--------
    plugin.addCommand({
        id: '04-resolve-frontmatter-as-link',
        name: '解析渲染frontmatter外部链接文本为可点击访问的链接（仅阅读模式）',
        callback: () => {
            resolveFrontmatterLinkTextAsLink();

        }
    });
    // Set line which ends with question mark to h2 header
    /*  nlToolsKit.addCommand({
         id: '05-set-line-end-with-question-mark-to-h2',
         name: '设置以?/？结尾的内容的行作为h2标题',
         callback: () => {
             SetLineEndWithQMarkToH2Title();
 
         }
     }); */
    // --------Copy main body of note to clipboard--------
    plugin.addCommand({
        id: '06-copy-main-body-of-note-and-write-to-clipboard',
        name: '复制正文（不包括yaml区）的内容到剪切板',
        callback: async () => {
            copyMainContentToClipboard();
        }
    });
    // --------Get main content with toc--------
    plugin.addCommand({
        id: '07-copy-main-body-of-note-with-toc-and-write-to-clipboard',
        name: '复制带有 TOC 的的正文到剪切板',
        callback: async () => {
            const contents: string = (await getContentsArr()).join('\n');
            const yaml: string = await getYaml();
            const toc: string = await generateTableOfContents();
            const mainContent: string = await getMainContent() as string;
            const contentWithTOC = `${yaml}\n${toc}\n${mainContent}`;
            copyContentToClipboard(contentWithTOC);
        }
    });
    // --------Insert copyright to blankline --------
    plugin.addCommand({
        id: '07-insert-copyright-to-blankline',
        name: '添加版权信息到文档中空行',
        callback: async () => {
            insertCopyright(plugin);
        }
    });
    // --------Generate unique id for file from file name with md5 --------
    plugin.addCommand({
        id: '08-generate-uniqute-id-for-file-from-file-name-with-md5',
        name: '根据文件名给指定字段生成MD5唯一id',
        callback: async () => {
            addUniqueIdToFrontmatterField(plugin);
        }
    });
    // --------Add image caption text --------
    plugin.addCommand({
        id: '09-add-image-caption-text',
        name: '添加图注文本',
        callback: async () => {
            addImgCaptionText(plugin);
        }
    });

}






