import { useState } from "react";
import { useDrop } from "react-dnd";

export const Droppable = () => {
  const [hasDropped, setHasDropped] = useState(false);
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: "draggable",
      drop(item, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setHasDropped(true);
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true })
      })
    }),
    setHasDropped
  );
  return <div ref={drop} id="droppable"></div>;
};
