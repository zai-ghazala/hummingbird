import React from "react";
import { Word } from './word.jsx';
import { DragDropContainer } from 'react-drag-drop-container';
    
export const Poem = props => {
  return (
    <>
      {props.poem.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
                <DragDropContainer key={"dragdropcontainer" + i}><Word key={"word" + i} word={word}/></DragDropContainer>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
