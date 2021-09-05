import React from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: []
    };
  }

  handleDrop() {
    let words = this.state.words.slice();
    words.push({ word: this.props.currentWord });
    this.setState({ words: words });
    console.log(words);
  }

  render() {
    return (
      <DropTarget onHit={this.handleDrop} targetKey="drag">
        {this.state.words.map((word, i) => {
          return (
            <Word key={"dropped_word" + i} word={this.props.currentWord} />
          );
        })}
      </DropTarget>
    );
  }
}
