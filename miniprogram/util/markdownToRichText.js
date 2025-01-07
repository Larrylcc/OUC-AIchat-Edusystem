function markdownToRichText(markdown) {
  // 简单实现Markdown到富文本的转换
  let richText = markdown
    .replace(/### (.*?)\n/g, '<h3>$1</h3>')//三级标题
    .replace(/## (.*?)\n/g, '<h2>$1</h2>')//二级标题
    .replace(/# (.*?)\n/g, '<h1>$1</h1>')//一级标题
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // 加粗
    .replace(/\*(.*?)\*/g, '<i>$1</i>') // 斜体
    .replace(/`(.*?)`/g, '<code>$1</code>') // 代码
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') // 链接
    .replace(/\n/g, '<br/>'); // 换行

  return richText;
}

module.exports = markdownToRichText;