import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./types";


    
export const Poem = props => {
  
  const [, drag] = useDrag(() => ({ type: ItemTypes.WORD }));
  

  return (
    <>
      {props.poem.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
                <span   ref={(span) => { drag = span; }}  className="word" key={"word-" + i}>
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
