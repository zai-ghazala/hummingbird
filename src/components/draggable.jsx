import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./types";

export const Draggable = props => {
  const [word, setWord] = useState("");
  const [, drag] = useDrag(() => ({ type: ItemTypes.WORD }));

  const showPoem = () => {
    {
      props.poem.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
              
              
                {const newRef = createRef();
                LiRefs.push(newRef);
                return (
                
                
                <span ref={drag[i]} className="word" key={"word-" + i}>
                {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      ));
    }
  };

  useEffect(() => {
    showPoem();
  }, []);

  return <></>;
};
