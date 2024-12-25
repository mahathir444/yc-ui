import themes from 'juejin-markdown-themes';

// 加载高亮依赖
export const getTheme = () => {
  const highlightThemes: Record<string, any> = {};
  const modules = import.meta.glob(
    '/node_modules/highlight.js/styles/*.min.css',
    { as: 'raw', eager: true }
  );
  for (const path in modules) {
    const name = path
      .replace(/(\.\/|\.min\.css)$/i, '')
      .replace('/node_modules/highlight.js/styles/', '');
    const theme = modules[path];
    highlightThemes[name] = { style: theme };
  }
  return {
    highlightThemes,
    mdThemes: themes,
  };
};

export const getCursorIndex = (
  str: string,
  selection: {
    ch: number;
    line: number;
    sticky: 'after' | 'before';
    xRel: number;
  }
) => {
  // 1. 将字符串按行分割
  const lines = str.split('\n');
  // 2. 计算光标所在行之前的所有字符数（包括换行符）
  let index = 0;
  for (let i = 0; i < selection.line; i++) {
    // 每行的长度 + 换行符的长度 (换行符占用1个字符)
    index += lines[i].length + 1; // 注意，这里对于空行也是计算 +1
  }
  // 3. 加上当前行的光标位置 (注意 "sticky" 的值决定光标是在字符前还是后)
  if (selection.sticky === 'after') {
    index += selection.ch; // 光标位于字符的后面
  } else if (selection.sticky === 'before') {
    index += selection.ch - 1; // 光标位于字符的前面
  }
  return index;
};
