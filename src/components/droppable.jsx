import React, { useState } from "react";
import { useDrop } from "react-dnd";

export const Droppable = greedy => {
  const [hasDropped, setHasDropped] = useState(false);

  const [{ isOver, isOverCurrent }, dropRef] = useDrop(
    () => ({
      accept: "word",
      drop(item, monitor) {
        const didDrop = monitor.didDrop();
        setHasDropped(true);
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true })
      })
    }),
    [setHasDropped]
  );

  return <div ref={dropRef} id="droppable"></div>;
};
