import { BytemdPlugin } from 'bytemd';
import { Message } from '@arco-design/web-vue';
import { imageScaleIcon } from './pluginIcon';
import { getCursorIndex } from '../utils';

export default () => {
  // 获取markdown语法类型;
  function isVaildSyntaxType(str: string) {
    const reg =
      /(?:!\[.*?\]\(\s*(?:https?:\/\/[^\s)]+|[^\s)]+)\s*(?:".*?")?\s*\)|<img\s+[^>]*src=["'].*?["'][^>]*>)/is;
    //处理字符串
    const matchStr = str
      .split('\n')
      .map((item) => item)
      .join('\n');
    return reg.test(matchStr);
  }

  // 返回插件对象
  return {
    actions: [
      {
        title: '图片缩放',
        icon: imageScaleIcon,
        handler: {
          type: 'dropdown',
          actions: ['30%', '50%', '70%', '100%'].map((v) => {
            return {
              title: v,
              handler: {
                type: 'action',
                click({ editor }) {
                  console.log(editor);
                  const textArr = editor.getSelections();
                  textArr.forEach((text) => {
                    if (!text.length) {
                      // 拿到当前的html字符串
                      const valueStr = editor.getValue();
                      // 拿到光标的位置
                      const cursorPostion = editor.getCursor();
                      // 计算光标处于的index
                      const cursorIndex = getCursorIndex(
                        valueStr,
                        cursorPostion as any
                      );
                      // 如果没有选中文本，插入默认的 img 标签到光标位置
                      editor.setValue(
                        valueStr.slice(0, cursorIndex) +
                          `<img src="" alt="" width="${v}" />` +
                          valueStr.slice(cursorIndex)
                      );
                    } else {
                      // 判断语法类型
                      const isValid = isVaildSyntaxType(text);
                      if (!isValid) {
                        return Message.error('请选择合法的图片语法');
                      }
                      let replaceText = '';
                      // 解析dom
                      const parser = new DOMParser();
                      const doc = parser.parseFromString(text, 'text/html');
                      // 查找是否存在图片
                      const img = doc.querySelector('img') as HTMLImageElement;
                      if (img) {
                        // 存在进行替换
                        if (img.hasAttribute('width')) {
                          replaceText = text.replace(
                            /width="\d+%"/g,
                            `width="${v}"`
                          );
                        }
                        // 不存在的话则拼接width属性,这里可能存在问题
                        else {
                          const index = text.indexOf('>');
                          replaceText =
                            text.slice(0, index) +
                            `width=${v}` +
                            text.slice(index);
                        }
                      } else {
                        // 计算alt
                        const altStart = text.indexOf('[');
                        const altEnd = text.indexOf(']');
                        const alt = text.slice(altStart + 1, altEnd);
                        // 计算src
                        const urlStart = text.indexOf('(');
                        const urlEnd = text.indexOf(')');
                        const url = text.slice(urlStart + 1, urlEnd);
                        // 计算语法
                        const syntax = text.slice(altStart - 1, urlEnd + 1);
                        // 计算替换句子
                        replaceText = text.replace(
                          syntax,
                          `<img src="${url.replace(new RegExp(`"${alt}"`, 'gi'), '')}" alt="${alt}" width="${v}" />`
                        );
                      }
                      editor.setValue(
                        editor.getValue().replace(text, replaceText)
                      );
                    }
                  });
                },
              },
            };
          }),
        },
      },
    ],
  } as BytemdPlugin;
};
