import React from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const handleDrop = e => {
    e.preventDefault;
    e.stopPropagation;
    console.log(props.currentWord)
  };

  return <DropTarget onHit={(e) => handleDrop(e)} targetKey="drag"></DropTarget>;
};
