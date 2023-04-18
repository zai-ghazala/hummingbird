import React from "react";
import { Word } from './word.jsx';
    
export const Poem = (props) => {
  return (
    <>
         {props.poem.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
                <Word handleDrag={props.handleDrag} key={"word" + i} word={word}/>
              ))}
            </div>
          ))}
    </>
  );
};
