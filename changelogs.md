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
