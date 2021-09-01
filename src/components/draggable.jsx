import React from "react";
import { useDrag } from "react-dnd";

export const Draggable = props => {
  const [, drag] = useDrag(() => ({ type: 'draggable' }));

  return (
    <>
      {props.poem.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
                <div ref={drag} className="word" key={"word-" + i}>
                  {word}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Draggable;
