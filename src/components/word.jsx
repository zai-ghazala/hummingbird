import React, { useState } from "react";
import { DragDropContainer } from "react-drag-drop-container";

export const Word = (props) => {

  
  return (
    <div className="drag">
      <DragDropContainer targetKey="key" dragClone={true}  onDrag={() => props.handleDrag(props.word)}>
        <span className="word">{props.word}</span>
      </DragDropContainer>
    </div>
  );
};
