import React, { useState } from "react";
import { DropTarget, DragDropContainer } from "react-drag-drop-container";
import { Word } from "./word.jsx";

export const Space = currentWord => {
  const [words, setWords] = useState([]);

  const handleDrop = e => {
    let words = words.slice();
    words.push(currentWord);
    this.setState({ words: words });
    console.log("dropped");
  };

  return (
    <DropTarget targetKey="drag" onHit={handleDrop}>
      {this.state.words.map((word, i) => {
        return <Word key={"dropped_word" + i} word={word} />;
      })}
    </DropTarget>
  );
};
