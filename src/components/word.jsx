import React, {useState} from "react";
import { DragDropContainer } from "react-drag-drop-container";

export const Word = props => {
  const word = props.word + ' ';
  const [currentWord, setCurrentWord] = useState("");
  
  const onDrag = (e) => {
    
    
  }
  
  return (
    <div className="drag">
      <DragDropContainer
        dragClone={true}
        targetKey="drag"
         dragData={{word: word}}
        onDrag={onDrag}>
        <span className="word">{props.word}</span>
      </DragDropContainer>
    </div>
  );
};
