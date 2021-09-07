import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [newLineSuccess, setNewLineSuccess] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);
  
  const handleDrop = currentWord => {
    setComposedPoem([...composedPoem, currentWord]);
    setNewLineSuccess(false);
    setClearSuccess(false);
    setCopySuccess(false);
  };

  const copy = e => {
    e.preventDefault();
    let text = composedPoem.join(" ");

    text = text.replace(/ \[object Object\] /g, "\n");

    navigator.clipboard.writeText(text).then(function() {
      setCopySuccess(true);
    });
  };

  const clear = e => {
    e.preventDefault();
    setComposedPoem([]);
    setClearSuccess(true);
  };

  const newLine = e => {
    e.preventDefault();
    setComposedPoem([...composedPoem, <div></div>]);
    setNewLineSuccess(true);
  };

  return (
    <>
      <div id="space">
        <div className="footer2">
          <div></div>
          <div className="compose-message">
            
            {copySuccess || clearSuccess ? "start over?" : newLineSuccess ? "new line!" :  "drop here 📝" }
        
          </div>
          <div className="footer2-buttons">
            <button className="copy" type="button" onClick={copy}>
              {copySuccess && composedPoem.len? "✨" : "⎘"}
            </button>
            <button className="clear" type="button" onClick={clear}>
              {clearSuccess ? "✨" : "␡"}
            </button>
            <button className="newline" type="button" onClick={newLine}>
              {newLineSuccess ? "✨" : "↵"}
            </button>
          </div>
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
      </div>
    </>
  );
};
