import React from "react";
import { DragDropContainer } from "react-drag-drop-container";

export const Word = props => {
  return (
    <DragDropContainer>
      <span className="word">{props.word}</span>
    </DragDropContainer>
  );
};
