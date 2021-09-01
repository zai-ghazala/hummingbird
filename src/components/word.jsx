import React from "react";
import { useDrag } from "react-dnd";

export const Word = props => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "word",
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div className="wordwrapper" ref={dragRef}>
      <span className="word">{props.word}</span>
    </div>
  );
};
