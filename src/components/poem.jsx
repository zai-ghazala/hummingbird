import React, {useState} from "react";
import { Word } from './word.jsx';
    
export const Poem = (props, onDrag) => {
  return (
    <>
      {props.poem.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
               <Word onDrag={handleDrag} key={"word" + i} word={word}/>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};