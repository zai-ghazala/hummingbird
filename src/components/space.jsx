import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);
  console.log(composedPoem, props.currentWord)
  
  
  
  const handleDrop = (e, currentWord) => {
    setComposedPoem(currentWord => [...composedPoem, currentWord]);
  };

  return (
    <DropTarget
      handleDrag={props.handleDrag}
      onHit={e => handleDrop(e, props.currentWord)}
    >
      <div id="space">
        {composedPoem.map((word, i) => {
          return <Word key={"dropped_word" + i}  />;
        })}
      </div>
    </DropTarget>
  );
};
