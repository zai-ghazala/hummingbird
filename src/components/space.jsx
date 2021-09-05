import React from "react";
import { DropTarget, DragDropContainer } from "react-drag-drop-container";
import { Word } from "./word.jsx";

export const Space = props => {

  const handleDrop = (e) => {
      let words = this.state.words.slice();
      words.push(currentWord);
      this.setState({words: words});
    console.log('dropped');
  }
  

  render() {
    return (
      <DropTarget targetKey="drag" onHit={this.handleDrop}>
        {this.state.words.map((word, i) => {
          return <Word key={"dropped_word" + i} word={word} />;
        })}
      </DropTarget>
    );
  }
}
