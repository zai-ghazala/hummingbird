import React, { useState } from "react";
import { DragDropContainer } from "react-drag-drop-container";

export const Word = props => {
  const word = props.word + " ";
  const [currentWord, setCurrentWord] = useState("");

  const handleWord = e => {
    setCurrentWord(word);
  };

  return (
    <div className="drag">
      <DragDropContainer dragClone={true} targetKey="drag" onDrag={handleWord}>
        <span className="word">{props.word}</span>
      </DragDropContainer>
    </div>
  );
};
