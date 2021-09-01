import React from "react";
import { useDrag } from "react-dnd";

export const Word = props => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "word",
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  const content = props;

  return (
    <>
      <span ref={dragRef} className="word">
        {content}
      </span>
    </>
  );
};
