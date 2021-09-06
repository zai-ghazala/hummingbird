import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);
  const [copySuccess, setCopySuccess] = useState([]);

  
  const handleDrop = (e, currentWord) => {
    e.preventDefault();
    e.stopPropagation();
    setComposedPoem([...composedPoem, currentWord]);
  };

  const handleClick = (e) => {
    const el = this.input;
    el.select()
    document.execCommand("copy")
    this.setState({copySuccess: true})
  };

  return (
    <div id="space">
      <div className="footer2"></div><div><div>compose your poem here 📝</div><div><a onClick={() => handleClick}>{state.copySuccess ? '✨' : '⎘'}</a></div></div>
      <DropTarget
        handleDrag={props.handleDrag}
        onHit={e => handleDrop(e, props.currentWord)}
      >
        <div className="enter">
          {composedPoem.map((word, i) => {
            return <Word key={"dropped_word" + i} word={word} />;
          })}
        </div>
      </DropTarget>
    </div>
  );
};
