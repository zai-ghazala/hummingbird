import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = (props) => {
  const [composedPoem, setComposedPoem] = useState([]);

  console.log("out", props.currentWord);

  const handleDrop = (e, currentWord) => {
    
    e.stopPropagation();
    e.preventDefault();
    
    setComposedPoem([...composedPoem, currentWord]);
    console.log("handleDrop", props.currentWord, currentWord);
  };

  return (
    <DropTarget
      handleDrag={props.handleDrag}
      onHit={(e) => handleDrop(e, props.currentWord)}
    >
      {composedPoem.map((word, i) => {
        return <Word key={"dropped_word" + i} word={props.currentWord} />;
      })}
    </DropTarget>
  );
};
