import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [newLineSuccess, setNewLineSuccess] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);
  const [backspaceSuccess, setBackspaceSuccess] = useState(false);

  const handleDrop = currentWord => {
    setComposedPoem([...composedPoem, currentWord]);
    setNewLineSuccess(false);
    setClearSuccess(false);
    setCopySuccess(false);
    setBackspaceSuccess(false);
  };

  const copy = e => {
    e.preventDefault();
    let text = composedPoem.join(" ");

    text = text
      .replace(/\[object Object\] /g, "\n")
      .replace(/ \[object Object\] /g, "\n");

    navigator.clipboard.writeText(text).then(function() {
      if (composedPoem.length != 0) {
        setCopySuccess(true);
        setNewLineSuccess(false);
      }
    });
  };

  const clear = e => {
    e.preventDefault();
    if (composedPoem.length != 0) {
      setComposedPoem([]);
      setClearSuccess(true);
    }
  };

  const newLine = e => {
    e.preventDefault();
    if (composedPoem.length != 0) {
      setComposedPoem([...composedPoem, <div></div>]);
      setNewLineSuccess(true);
    }
  };

  const backspace = e => {
    e.preventDefault();
    if (composedPoem.length != 0) {
      const temp = [...composedPoem];
      temp.pop();
      setComposedPoem(temp);
      setBackspaceSuccess(true);
    }
  };

  return (
    <>
      <div id="space">
        <div className="compose-message">
          {clearSuccess
            ? "start over?"
           : backspaceSuccess
            ? "backspace"
           : copySuccess
            ? "copied!"
            : newLineSuccess
            ? "new line"
            : null}
        </div>
        <DropTarget
          handleDrag={props.handleDrag}
          onHit={() => handleDrop(props.currentWord)}
        >
          <div className="enter">
            {composedPoem.map((word, i) => {
              return <span key={word + i}>{word} </span>;
            })}
          </div>
        </DropTarget>
        <div className="footer-buttons">
          <button className={copySuccess || clearSuccess || composedPoem.length === 0
            ? 'disabled' : null} type="button" onClick={copy}>
            ⎘
          </button>
          <button className={clearSuccess|| composedPoem.length === 0
            ? 'disabled' : null} type="button" onClick={clear}>
            ␡
          </button>
          <button className={clearSuccess || composedPoem.length === 0
            ? 'disabled' : null} type="button" onClick={backspace}>
            ⌫
          </button>
          <button className={clearSuccess || composedPoem.length === 0
            ? 'disabled' : null} type="button" onClick={newLine}>
            ↲
          </button>
        </div>
      </div>
    </>
  );
};
