import { unref } from 'vue';
import { themeIcon, highlightIcon } from './pluginIcon';
import { BytemdPlugin } from 'bytemd';
import { getTheme } from '../utils';
let $tree: any;
let $frontmatter: any;
const { highlightThemes, mdThemes } = getTheme();
// 切换主题
const changeTheme = (themeName: string) => {
  removeTheme();
  const $style = document.createElement('style');
  $style.id = `md_document_${themeName}`;
  $style.innerHTML = mdThemes[themeName]?.style ?? mdThemes['juejin'].style;
  document.head.appendChild($style);
  return () => {
    $style.remove();
  };
};
// 删除主题
const removeTheme = () => {
  const $rm = document.getElementsByTagName('style');
  for (let i = 0; i < $rm.length; i++) {
    if ($rm[i].id.includes('md_document')) {
      document.head.removeChild($rm[i]);
    }
  }
};
// 切换高亮主题
const changeHighlightTheme = (themeName: string) => {
  removeHighlightTheme();
  const $style = document.createElement('style');
  $style.id = `md_highlightjs_${themeName}`;
  $style.innerHTML =
    highlightThemes[themeName]?.style ?? highlightThemes['github'].style;
  document.head.appendChild($style);
  return () => {
    $style.remove();
  };
};
// 移除高亮主题
const removeHighlightTheme = () => {
  const $rm = document.getElementsByTagName('style');
  for (let i = 0; i < $rm.length; i++) {
    if ($rm[i].id.includes('md_highlightjs')) {
      document.head.removeChild($rm[i]);
    }
  }
};

export default (options = { theme: 'juejin', highlight: 'juejin' }) => {
  return {
    viewerEffect({ file }: any) {
      const themeName =
        unref(file)?.frontmatter?.theme || options.theme || 'github';
      const highlightName =
        unref(file)?.frontmatter?.highlight || options.highlight || 'github';
      changeTheme(themeName);
      changeHighlightTheme(highlightName);
    },
    actions: [
      {
        title: 'markdown 主题',
        icon: themeIcon,
        handler: {
          type: 'dropdown',
          actions: Object.keys(mdThemes).map((themeName) => {
            return {
              title: themeName,
              handler: {
                type: 'action',
                click({ editor }) {
                  if (
                    !!$tree.children.length &&
                    $tree.children[0].type === 'yaml'
                  ) {
                    $frontmatter = $tree.children[0];
                  } else {
                    $frontmatter = undefined;
                  }
                  if ($frontmatter) {
                    const machted = $frontmatter.value.match(/theme:\s*(\S*)/i);
                    if (machted) {
                      editor.setValue(
                        editor
                          .getValue()
                          .replace(
                            $frontmatter.value,
                            $frontmatter.value.replace(
                              /theme:\s*(\S*)/i,
                              `theme: ${themeName}`
                            )
                          )
                      );
                    } else {
                      editor.setValue(
                        editor
                          .getValue()
                          .replace(
                            $frontmatter.value,
                            $frontmatter.value + `\ntheme: ${themeName}`
                          )
                      );
                    }
                  } else {
                    editor.setValue(
                      `---\ntheme: ${themeName}\n---` + editor.getValue()
                    );
                  }
                },
              },
            };
          }),
        },
      },
      {
        title: '代码高亮样式',
        icon: highlightIcon,
        handler: {
          type: 'dropdown',
          actions: Object.keys(highlightThemes).map((themeName) => {
            return {
              title: themeName,
              handler: {
                type: 'action',
                click({ editor }) {
                  if (
                    !!$tree.children.length &&
                    $tree.children[0].type === 'yaml'
                  ) {
                    $frontmatter = $tree.children[0];
                  } else {
                    $frontmatter = undefined;
                  }
                  if ($frontmatter) {
                    const machted =
                      $frontmatter.value.match(/highlight:\s*(\S*)/i);
                    if (machted) {
                      editor.setValue(
                        editor
                          .getValue()
                          .replace(
                            $frontmatter.value,
                            $frontmatter.value.replace(
                              /highlight:\s*(\S*)/i,
                              `highlight: ${themeName}`
                            )
                          )
                      );
                    } else {
                      editor.setValue(
                        editor
                          .getValue()
                          .replace(
                            $frontmatter.value,
                            $frontmatter.value + `\nhighlight: ${themeName}`
                          )
                      );
                    }
                  } else {
                    editor.setValue(
                      `---\nhighlight: ${themeName}\n---` + editor.getValue()
                    );
                  }
                },
              },
            };
          }),
        },
      },
    ],
    remark(processor) {
      return processor.use(() => (tree: any) => {
        $tree = tree;
      });
    },
  } as BytemdPlugin;
};
