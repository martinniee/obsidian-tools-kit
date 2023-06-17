# 更新日志

-   2023 年 3 月 29 日
    -   17 点 19 分 新增 ”添加 back to top (回到顶部) " 链接在 `H1` 标题 层级下的标题（h1/2/3/4/5/6）上方
    -   02 点 21 分 新增 ”复制添加了 back to top 链接的正文内容到剪切板 针对 Juejin 的锚链接格式`[回到顶部](#heading-0)`
    -   12 点 17 分 新增 解析 `frontmatter` 区域的外部链接格式的字段值为可点击访问的链接
    -   14 点 34 分 修复——解析 frontmatter 区域的链接时渲染的链接随着页面切换数量持续增加，仅保留一个
-   2023 年 4 月 1 日
    -   15 点 23 分 重构：封装功能逻辑到单独的文件
    -   16 点 54 分 修复：当笔记中不包含 frontmatter 写入剪切板内容空
-   2023 年 4 月 1 日
    -   16 点 10 分 修复：🐞 fix: when enabling the Display Frontmatter core plugin and the frontmatter containing tags field. to resolve frontmatter as link failed
-   2023 年 4 月 29 日
    -   19 点 46 分 修复：🐞 fix: render does not work as the yaml contains aliases field with value
-   2023 年 5 月 5 日

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
