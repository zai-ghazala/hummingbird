import React, { useState } from "react";
import { DragDropContainer } from "react-drag-drop-container";

export const Word = props => {
  const word = props.word;

  return (
    <div className="drag">
      <DragDropContainer dragClone={true} dragData={word} targetKey="drag">
        <span className="word">{word}</span>
      </DragDropContainer>
    </div>
  );
};
