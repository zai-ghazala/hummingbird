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
      setComposedPoem([...composedPoem, composedPoem.slice(0, -1)]);
      setBackspaceSuccess(true);
    }
  };

  console.log(copySuccess, clearSuccess);

  return (
    <>
      <div id="space">
        <div className="compose-message">
          {clearSuccess
            ? "start over?"
            : copySuccess
            ? "copied!"
            : newLineSuccess
            ? "new line!"
            : backspaceSuccess
            ? "backspace!"
            : null}
        </div>
        <DropTarget
          handleDrag={props.handleDrag}
          onHit={() => handleDrop(props.currentWord)}
        >
          <div className="enter">
            {composedPoem.map((word, i) => {
              return <span key={"droppedWord" + i}>{word} </span>;
            })}
          </div>
        </DropTarget>
        <div className="footer-buttons">
          <button className="copy" type="button" onClick={copy}>
            {copySuccess ? "✨" : "⎘"}
          </button>
          <button className="clear" type="button" onClick={clear}>
            {clearSuccess ? "✨" : "␡"}
          </button>
          <button className="newline" type="button" onClick={newLine}>
            {newLineSuccess != 0 ? "✨" : "↲"}
          </button>
          <button className="backspace" type="button" onClick={newLine}>
            {backspaceSuccess != 0 ? "✨" : "↲"}
          </button>
        </div>
      </div>
    </>
  );
};
