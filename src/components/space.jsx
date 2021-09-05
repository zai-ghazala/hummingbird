import React from "react";
import { DropTarget, DragDropContainer } from "react-drag-drop-container";
import { Word } from "./word.jsx";

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: [] };
  }

  handleDrop(e) {
      let words = this.state.words.slice();
      words.push({word: e.dragData.word});
      this.setState({words: words});
    console.log('dropped');
  }
  

  render() {
    
console.log(this.state);
    return (
      <DropTarget targetKey="drag" onHit={this.handleDrop}>
        {this.state.words.map((word, i) => {
          return <Word key={"dropped_word" + i} word={word} />;
        })}
      </DropTarget>
    );
  }
}
