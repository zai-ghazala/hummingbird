import * as React from "react";
import * as axios from "axios";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";

const URL = "https://poetrydb.org/random,author/1;Dickinson";

export class Random extends React.Component {
  constructor(props) {
    super(props);
    this.getPoem = this.getPoem.bind(this);
    this.state = {
      poem: [],
      dragged: [],
    };
  }
  getPoem() {
    axios
      .get(URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(({ data }) => {
        this.setState({
          poem: data
        });
      })
      .catch(err => {});
  }

  componentDidMount() {
    this.getPoem();
  }

  handleClick(e) {
    e.preventDefault();
    this.getPoem();
  };
  
  handleDrop(e) {
      let dragged = this.state.dragged.slice();
      dragged.push({dragData, uid: shortid.generate()});
      this.setState({items: items});
      e.containerElem.style.visibility="hidden";
    };


  render() {
    return (
      <>
        <button type="button" onClick={e => this.handleClick(e)}>
          next
        </button>
        {this.state.poem.map((item, i) => (
          <div key={"block-" + i}>
            {item.lines.map((line, i) => (
              <div key={"line-" + i}>
                {line.split(" ").map((word, i) => (
                  <DragDropContainer dragdata={word} targetKey="foo">
                    <span className="word">{word}</span>
                  </DragDropContainer>
                ))}
              </div>
            ))}
          </div>
        ))}
        <DropTarget onHit={this.handleDrop} targetKey="foo">
          <div id="droppable"></div>
        </DropTarget>
      </>
    );
  }
}
