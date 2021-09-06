import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDrop = currentWord => {
    setComposedPoem([...composedPoem, currentWord]);
  };

  if (!navigator.clipboard) {
    console.log("hello");
  }

  const handleClick = (e) => {
    e.preventDefault();
    
    const text = composedPoem.join(' ');
    console.log(text);
    navigator.clipboard.writeText(text).then(function() {
      setCopySuccess(true);
    });
  };

  return (
    <>
      <div id="space">
        <div className="footer2"></div>
        <div></div>
          <div>compose your poem here 📝</div>
          <div>
            <button type="button" onClick={handleClick}>
              {copySuccess ? "✨" : "⎘"}
            </button>
          </div>
        </div>
        <DropTarget
          handleDrag={props.handleDrag}
          onHit={() => handleDrop(props.currentWord)}
        >
          <div className="enter">
            {composedPoem.map((word, i) => {
              return <Word key={"dropped_word" + i} word={word} />;
            })}
          </div>
        </DropTarget>

    </>
  );
};
