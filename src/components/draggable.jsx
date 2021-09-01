import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./types";


    
export const Draggable = props => {
  
  const [, drag] = useDrag(() => ({ type: ItemTypes.WORD }));
  

  return (
    

                <span ref={drag} className="word">
                  {props.poems.lines.split(" ")}
                </span>
    
      );
};
