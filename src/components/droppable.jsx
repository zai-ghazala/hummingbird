import React, { useState } from "react";
import { useDrop } from "react-dnd";

export const Droppable = greedy => {
  const [hasDropped, setHasDropped] = useState(false);
  
  function getStyle(backgroundColor) {
    return {
        border: '1px solid rgba(0,0,0,0.2)',
        minHeight: '8rem',
        minWidth: '8rem',
        color: 'white',
        backgroundColor,
        padding: '2rem',
        paddingTop: '1rem',
        margin: '1rem',
        textAlign: 'center',
        float: 'left',
        fontSize: '1rem',
    };
    
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

  return (
    <div ref={dropRef} id="droppable">
      <span>{text}</span>
    </div>
  );
};
