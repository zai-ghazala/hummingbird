import React from "react";
import { DropTarget } from "react-drag-drop-container";
var shortid = require('shortid');

export default class Space extends React.Component {
  constructor(props) {
    super(props);
    this.state = { words: [] };
  }

  dropped(e) {
    this.setState({ words: [...this.state.words, e.dragData] });
    
      let words = this.state.items.slice();
      words.push({word: e.dragData, uid: shortid.generate()});
      this.setState({items: items});
      e.containerElem.style.visibility="hidden";
    };
  }

  render() {
    return (
      <DropTarget
        targetKey="drag"
        onHit={this.dropped}
      >
        <div>{this.state.words}</div>
      </DropTarget>
    );
  }
}
