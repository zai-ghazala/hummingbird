import React, { useState } from "react";
import { useDrop } from "react-dnd";

export const Droppable = greedy => {
  const [hasDropped, setHasDropped] = useState(false);

  const [{ isOver, isOverCurrent }, dropRef] = useDrop(
    () => ({
      accept: "word",
      drop(item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop && !greedy) {
          return;
        }
        setHasDropped(true);
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true })
      })
    }),
    [greedy, setHasDropped]
  );

  const text = greedy ? "move me" : "";
  let backgroundColor = "rgba(0, 0, 0, .5)";
  if (isOverCurrent || (isOver && greedy)) {
    backgroundColor = "darkgreen";
  }

  return (
    <div ref={dropRef} id="droppable">
      <span>{text}</span>
    </div>
  );
};
