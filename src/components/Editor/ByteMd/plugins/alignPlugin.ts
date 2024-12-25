import { alignIcon } from './pluginIcon';
import { BytemdPlugin } from 'bytemd';
import { getCursorIndex } from '../utils';

export default () => {
  // 返回插件对象
  return {
    actions: [
      {
        icon: alignIcon,
        handler: {
          type: 'dropdown',
          actions: [
            {
              label: '左对齐',
              value: 'left',
            },
            {
              label: '居中对齐',
              value: 'center',
            },
            {
              label: '右对齐',
              value: 'right',
            },
          ].map((option) => {
            return {
              title: option.label,
              // icon: '',
              handler: {
                type: 'action',
                click({ editor }) {
                  console.log(editor);
                  editor.getSelections().forEach((text) => {
                    if (!text.length) {
                      const valueStr = editor.getValue();
                      const cursorPosition = editor.getCursor();
                      const cursorIndex = getCursorIndex(
                        valueStr,
                        cursorPosition as any
                      );
                      // 如果没有选中文本，插入默认的 p 标签到光标位置
                      editor.setValue(
                        valueStr.slice(0, cursorIndex) +
                          `<p align=${option.value}></p>` +
                          valueStr.slice(cursorIndex)
                      );
                    } else {
                      const parser = new DOMParser();
                      const doc = parser.parseFromString(text, 'text/html');
                      const p = doc.querySelector('p') as HTMLParagraphElement;
                      let replaceText;
                      // 如果存在p则替换其原来的属性
                      if (p) {
                        const align = p.getAttribute('align');
                        if (align) {
                          replaceText = text.replace(
                            new RegExp(`align=${align}`, 'gi'),
                            `align=${option.value}`
                          );
                        }
                        // 这里可能存在问题
                        else {
                          const index = text.indexOf('>');
                          replaceText =
                            text.slice(0, index) +
                            `align=${option.value}` +
                            text.slice(index);
                        }
                      }
                      // 不存在向外包一层
                      else {
                        replaceText = `<p align=${option.value}>${text}</p>`;
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
