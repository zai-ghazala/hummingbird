import React, { useState } from "react";
import { useDrop } from "react-dnd";

export const Droppable = () => {
   const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "word",
    drop: () => populateDroppable(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={dropRef} id="droppable">
      {isOver && <span>hello</span>}
    </div>
  );
};
