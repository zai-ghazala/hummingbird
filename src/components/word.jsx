import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./types";

export const Draggable = props => {
  
  const [, drag] = useDrag(() => ({ type: ItemTypes.WORD }));
  

  return (
    <>
      {props.poem.lines.split(" ").map((word, i) => (
      <span
         key={"word" + i}
         className="word">
        {word}
      </span>
    ))}
    
  </>
);
}