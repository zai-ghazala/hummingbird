import React, { useState } from "react";
import { DragDropContainer } from "react-drag-drop-container";

export const Word = (props, setCurrentWord, onDrag) => {
  const word = props.word;

  return (
    <div className="drag">
      <DragDropContainer dragClone={true} onDrag={() => setCurrentWord(word)} targetKey="drag">
        <span className="word">{word}</span>
      </DragDropContainer>
    </div>
  );
};
