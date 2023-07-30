# 更新日志

.....

Release 0.1.5

-   2023 年 5 月 5 日 ✨ feat: copy contents with toc and write into clipboard

Release 0.2.5 2023/5/16

-   ✨ feat: insert copyright to blankline of random index
-   ✨ feat: numbering heading starting with h2-level
-   🐞 fix: extract heading from #comment within codefence generate TOC incorrectly
-   ✨ feat: add value of unique id to specific key in frontmatter by filename with md5

Release 0.3.5 2023/06/01

-   ✨ feat: 增加添加图注文本的功能
-   🦄 refactor: 重命名文件名使用驼峰命令代替 '-' 命名
-   🐞 fix: uniqueId 字段与 值 之间没有空格导致语法错误

Release 0.3.6 2023/06/05

-   🐞 fix: 添加 center 标签使图注水平居中显示 ； 修复严格换行模式的阅读模式中，相邻两行图片链接行添加图注后在一行导致显示错误
-   🐞 fix: 插件设置中没有读取数据导致配置不生效

Release 0.4.0 2023/06/14

-   ✨ feat: 新增“插入 toc”功能; 新增文件文本处理工具方法 fileContentsProcess
-   ✨ feat: 新增 “编号标题”功能
-   ✨ feat: 新增“ 清除已有 TOC” 功能
-   🦄 refactor: 使用 “文件处理工具方法” 重构 back2top link 的实现

Release 0.4.1 2023/06/14

-   ✨ feat: enhancing function to process async operation
-   ✨ feat: enhancing to remove existed toc before adding
-   ✨ feat: enhancing to remove existed numbers as prefix of heading before adding

Release 0.4.2 2023/06/14

-   🐞 fix: no replace all blankspaces to heading title when generating toc

Release 0.4.3 2023/06/17

-   🦄 refactor: create a class for dedicated usage in text-processing
-   ✨ feat: create config file for dedicated context menu adding
-   🦄 refactor: refactor toc ,numbering headings operation with new encapsulated tool class. enhancing some functions

Release 0.4.4 2023/06/18

-   🦄 refactor: factor with new tool class
-   ✨ feat: support to use plugin instance in the callback for settings data
-   🌈 style: remove console.log
-   🦄 refactor: place all tool function/code to utils.ts
-   🐞 fix: insert TOC to unexpectd postion ; add index for indexing in callback
-   🦄 refactor: code for image caption operation
-   ✨ feat: use editor context menu instead of using command palette

Release 0.4.5 2023/06/18

-   🐞 fix: remain DELETE_LINE after executing the 'Markdown Toc: Delete ' command
-   🌈 style: change 'TO' to 'To'

Release 0.5.0 2023/07/23

-   🦄 refactor: re-design fileContentsProcesss class, refator the options code
-   ✨ feat: control copyright info density

Release 0.5.1 2023/07/30

-   ✨ feat: add optional style for numbering heading 2 level

Release 0.5.2 2023/07/30

-   🐞 fix: plugin setting config does not work
