import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);

  const handleDrop = (e, currentWord) => {
    setComposedPoem([...composedPoem, currentWord]);
  };

  console.log(composedPoem);

  return (
    
      <div id="space">
    <DropTarget
      handleDrag={props.handleDrag}
      onHit={e => handleDrop(e, props.currentWord)}
    >
      <div>
        {composedPoem.map((word, i) => {
          return <Word key={"dropped_word" + i} word={word} />;
        })}
      </div>
    </DropTarget>
    
    </div>
  );
};
