import React, { useState } from "react";
import { DropTarget, DragDropContainer } from "react-drag-drop-container";
import { Word } from "./word.jsx";

export const Space = props => {
  const currentWord = props.word;
  const [words, setWords] = useState([]);


  const handleDrop = () => {
        setWords([...words, currentWord]);
    };
  
  
  
  return (
    <DropTarget targetKey="drag" onHit={handleDrop}>
      {words.map((word, i) => {
        return <Word key={"dropped_word" + i} word={word} />;
      })}
    </DropTarget>
  );
};
