import * as React from "react";
import { useDrag } from "react-dnd";

function Draggable(props) {


  const [, drag] = useDrag(() => ({ type: "draggable" }));
  console.log(props.poem)
  return (
    <>
      {props.poem && props.poem.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
                <span ref={drag} className="word" key={"word-" + i}>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default Draggable;
