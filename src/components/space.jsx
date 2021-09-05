import React from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word";

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  handleDrop() {
    let words = this.state.items;
    words.push(this.props.currentWord);
    this.setState({ items: words });
    console.log(words);
  }

  render() {
    return (
      <DropTarget onHit={this.handleDrop}>
        {this.state.items.map((word, i) => {
          return (
            <Word key={"dropped_word" + i} word={this.props.currentWord} />
          );
        })}
      </DropTarget>
    );
  }
}
