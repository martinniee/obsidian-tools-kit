import { copyMainContentToClipboard } from "src/options/copy-main-body-of-note-and-write-to-clipboard";
import { SetLineEndWithQMarkToH2Title } from "src/options/set-line-end-with-question-mark-to-h2";
import { copyContentToClipboard } from "src/options/utils/copyContentToClipboard";
import MyPlugin from "../../main";
import { addBackToTopLinkForOtherHeaders, clearBackToTopLink } from "../options/add-back-to-top-link";
import { addBackToTopLinkForJuejin, copyMainContentWithAddedB2PLinkToClipboard } from "../options/add-back-to-top-link-for";
import { resolveFrontmatterLinkTextAsLink } from "../options/resolve-frontmatter-link-text-as-external-link";


export const addCommand = (myPlugin: MyPlugin) => {
    // --------Back-to-top link--------
    myPlugin.addCommand({
        id: '01-add-back-to-top-link-clear',
        name: '添加——回到顶部链接（根据h1标题）',
        callback: () => {
            addBackToTopLinkForOtherHeaders();

        }
    });
    myPlugin.addCommand({
        id: '02add-back-to-top-link',
        name: '清除——回到顶部链接（根据h1标题）',
        callback: () => {
            clearBackToTopLink();

        }
    });
    // --------Copy content added btp link for juejin to clipboard--------
    myPlugin.addCommand({
        id: '03-add-back-to-top-link-for-juejin',
        name: '复制已添加“回到顶部”链接文档的内容到剪切板（针对掘金平台）',
        callback: async () => {
            copyMainContentWithAddedB2PLinkToClipboard();
        }
    });
    // --------Resolve frontmatter link as Link--------
    myPlugin.addCommand({
        id: '04-resolve-frontmatter-as-link',
        name: '解析渲染frontmatter外部链接文本为可点击访问的链接（仅阅读模式）',
        callback: () => {
            resolveFrontmatterLinkTextAsLink();

        }
    });
    // Set line which ends with question mark to h2 header
    myPlugin.addCommand({
        id: '05-set-line-end-with-question-mark-to-h2',
        name: '设置以?/？结尾的内容的行作为h2标题',
        callback: () => {
            SetLineEndWithQMarkToH2Title();

        }
    });
    // --------Copy main body of note to clipboard--------
    myPlugin.addCommand({
        id: '06-copy-main-body-of-note-and-write-to-clipboard',
        name: '复制正文（不包括yaml区）的内容到剪切板',
        callback: async () => {
            copyMainContentToClipboard();
        }
    });

}






