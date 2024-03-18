import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom/client";


const RichTextEditor = () => {
 //リッチテキストごとにスタイルを設定するための変数の宣言
  const [textEditors, setTextEditors] = useState([
    {
      id: 1,
      text: '',
      styles: {
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        fontSize: '20px'
      },
      width: 'w-screen', // 初期の幅は狭い
      showButtons: false,
      isSelected: false,
      showButtonsTimeout: null,
    }
  ]);

  //userefをつかってテキストの入力状態を検知
  const textareaRefs = useRef([]);

  //DBにない場合の表示

  const handleChange = (event, id) => {
    const updatedEditors = textEditors.map((editor) => {
      if (editor.id === id) {
        return { ...editor, text: event.target.value };
      }
      return editor;
    });
    setTextEditors(updatedEditors);
  };

  const handleBold = (id) => {
    const updatedEditors = textEditors.map((editor) => {
      if (editor.id === id) {
        return { ...editor, styles: { ...editor.styles, fontWeight: editor.styles.fontWeight === 'bold' ? 'normal' : 'bold' } };
      }
      return editor;
    });
    setTextEditors(updatedEditors);
  };

  const handleItalic = (id) => {
    const updatedEditors = textEditors.map((editor) => {
      if (editor.id === id) {
        return { ...editor, styles: { ...editor.styles, fontStyle: editor.styles.fontStyle === 'italic' ? 'normal' : 'italic' } };
      }
      return editor;
    });
    setTextEditors(updatedEditors);
  };

  const handleUnderline = (id) => {
    const updatedEditors = textEditors.map((editor) => {
      if (editor.id === id) {
        return { ...editor, styles: { ...editor.styles, textDecoration: editor.styles.textDecoration === 'underline' ? 'none' : 'underline' } };
      }
      return editor;
    });
    setTextEditors(updatedEditors);
  };

  const handleFontSize = (size, id) => {
    const updatedEditors = textEditors.map((editor) => {
      if (editor.id === id) {
        return { ...editor, styles: { ...editor.styles, fontSize: `${size}px` } };
      }
      return editor;
    });
    setTextEditors(updatedEditors);
  };

  const handleAddTextarea = () => {
    const newId = textEditors.length + 1;
    const newEditor = { id: newId, text: '', styles: { fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', fontSize: '20px' }, width: 'w-screen', showButtons: false, isSelected: false, showButtonsTimeout: null };
    setTextEditors([...textEditors, newEditor]);
    textareaRefs.current.push(React.createRef());
  };

  const handleRemoveTextarea = (id) => {
    if(id != 1){
      const updatedEditors = textEditors.filter((editor) => editor.id !== id);
      setTextEditors(updatedEditors);
    }else{
      alert("これ以上消去できません")
    }
    
  };

  const handleTextareaFocus = (id) => {
    const updatedEditors = textEditors.map((editor) => {
      if (editor.id === id) {
        return { ...editor, isSelected: true, showButtons: true, width: 'w-screen' }; // 選択時に幅を広げる
      } else {
        return { ...editor, isSelected: false };
      }
    });
    setTextEditors(updatedEditors);
  };

  const handleTextareaBlur = (id) => {
    const updatedEditors = textEditors.map((editor) => {
      if (editor.id === id) {
        clearTimeout(editor.showButtonsTimeout);
        const timeout = setTimeout(() => {
          setTextEditors((prevEditors) =>
            prevEditors.map((ed) =>
              ed.id === id ? { ...ed, isSelected: false, showButtons: false, width: 'w-screen' } : ed // 非選択時に幅を狭める
            )
          );
        }, 5000);
        return { ...editor, isSelected: false, showButtonsTimeout: timeout };
      }
      return editor;
    });
    setTextEditors(updatedEditors);
  };

  const richTextarea = (editor, index) => {
    return (
      <div key={editor.id} className="mb-4">
        <div className="relative">
          <div
            className="flex justify-end mt-2"
            style={{ display: editor.showButtons ? 'flex' : 'none' }}
          >
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  id="options-menu"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  Options
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <button
                    className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => handleBold(editor.id)}
                  >
                    Bold
                  </button>
                  <button
                    className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => handleItalic(editor.id)}
                  >
                    Italic
                  </button>
                  <button
                    className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => handleUnderline(editor.id)}
                  >
                    Underline
                  </button>
                  <button
                    className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => handleFontSize(16, editor.id)}
                  >
                    Small
                  </button>
                  <button
                    className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => handleFontSize(24, editor.id)}
                  >
                    Large
                  </button>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleAddTextarea}
            >
              Add Textarea
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleRemoveTextarea(editor.id)}
            >
              Remove Textarea
            </button>
          </div>

          <div
            id={`editor-${editor.id}`}
            contentEditable="true"
            value={editor.text}
            onChange={(e) => handleChange(e, editor.id)}
            style={editor.styles}
            className={`${editor.width} overflow-hidden resize-none border border-gray-300 rounded-lg p-2`}
            onFocus={() => handleTextareaFocus(editor.id)}
            onBlur={() => handleTextareaBlur(editor.id)}
            ref={(el) => (textareaRefs.current[index] = el)}
          />
        </div>
      </div>
    );
  };

  return <div>{textEditors.map((editor, index) => richTextarea(editor, index))}</div>;
};

export default RichTextEditor;











