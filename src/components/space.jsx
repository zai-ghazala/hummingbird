import React from "react";
import { DropTarget } from "react-drag-drop-container";
import { Word } from "./word.jsx";

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: [] };
  }

  dropped(e) {
    this.setState({ words: [...this.state.words, e.dragData] });

    let words = this.state.words.slice();
    
    console.log(this.state);
    words.push(e.dragData);
    this.setState({ words: words });
  }

  render() {
    return (
      <DropTarget targetKey="drag" onHit={this.dropped}>
        {this.state.words.map((word, i) => {
          return <Word key={"dropped_word" + i} word={word} />;
        })}
      </DropTarget>
    );
  }
}
