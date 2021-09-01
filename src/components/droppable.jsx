import React, { useState } from 'react';
import { useDrop } from "react-dnd";

export const Droppable = ({ greedy, children }) => {
    const [hasDropped, setHasDropped] = useState(false);
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
    const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
        accept: "draggable",
        drop(item, monitor) {
            const didDrop = monitor.didDrop();
            if (didDrop && !greedy) {
                return;
            }
            setHasDropped(true);
            setHasDroppedOnChild(didDrop);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
        }),
    }), [greedy, setHasDropped, setHasDroppedOnChild]);
   
    return (<div ref={drop} id="droppable">
			<div>{children}</div>
        
        {hasDropped && <span>{word}</span>}
        
		</div>);
};

export default Droppable;
