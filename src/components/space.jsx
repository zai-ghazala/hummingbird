import React, {useState} from "react";
import { DropTarget, } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);

  const handleDrop = () => {
    setComposedPoem([...composedPoem, props.currentWord]);
  };

  return (
    <DropTarget
      handleDrag={props.handleDrag}
      onHit={() => handleDrop(props.currentWord)}
    >
      {composedPoem.map((word, i) => {
        return <Word key={"dropped_word" + i} word={props.currentWord} />;
      })}
    </DropTarget>
  );
};
