import React from "react";
import { DragDropContainer } from "react-drag-drop-container";

export const Word = props => {
  const word = props.word + ' ';
  
  return (
    <div className="drag">
      <DragDropContainer
        dragClone={true}
        targetKey="drag"
        dragData={word}
      >
        <span className="word">{props.word}</span>
      </DragDropContainer>
    </div>
  );
};
