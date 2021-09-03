import { useState } from "react";
import { useDrop } from "react-dnd";

export const Space = () => {
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

  return <div ref={dropRef} id="space"></div>;
};