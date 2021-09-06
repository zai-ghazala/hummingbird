import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);

  const handleDrop = (e, currentWord) => {
    e.preventDefault();
    e.stopPropagation();
    setComposedPoem([...composedPoem, currentWord]);
  };

  console.log(composedPoem);

  return (
    <div id="space">
      <div className="footer2">compose your poem here 📝</div>
      <DropTarget
        handleDrag={props.handleDrag}
        onHit={e => handleDrop(e, props.currentWord)}
      >
        <div className="enter">
          {composedPoem.map((word, i) => {
            return <Word key={"dropped_word" + i} word={word} />;
          })}
        </div>
      </DropTarget>
    </div>
  );
};
