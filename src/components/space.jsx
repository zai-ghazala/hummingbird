import React from "react";
import { DropTarget } from "react-drag-drop-container";

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: [] };
  }

  dropped(e) {
    this.setState({ words: [...this.state.words, e.dragData] });
  }

  render() {
    return (
      <DropTarget
        targetKey="drag"
        onHit={this.dropped}
        dropData={this.props.word}
      >
        <div></div>
      </DropTarget>
    );
  }
}
