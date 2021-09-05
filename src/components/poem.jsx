import React from "react";
import { Word } from './word.jsx';
    
export const Poem = (props, handleWord) => {
  
  return (
    <>
      {props.poem.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
               <Word key={"word" + i} word={word} handleWord={handleWord}/>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
