import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./types";


    
export const Draggable = props => {
  const [, drag] = useDrag(() => ({ type: ItemTypes.WORD }));
  

  return (
    <>
      {props.poem.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
                <span = {el => inputRef.current[i] = el}  className="word" key={"word-" + i}>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
