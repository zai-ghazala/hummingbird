import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./types";

export const Droppable = () => {
  const [hasDropped, setHasDropped] = useState(false);
  const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.WORD,
      drop(item, monitor) {
        const didDrop = monitor.didDrop();
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true })
      })
    }),
    [setHasDropped, setHasDroppedOnChild]
  );

  return (
    <div ref={drop} id="droppable">
      {hasDropped && <span>hello</span>}
    </div>
  );
};
