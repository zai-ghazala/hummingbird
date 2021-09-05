import React from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const dropped =(e) => {
    e.preventDefault;
    e.stopPropagation;
    console.log(props.currentWord)
  };

  return <DropTarget onHit={dropped} targetKey="drag"></DropTarget>;
};
