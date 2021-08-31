import * as React from "react";
import * as axios from "axios";
import ReactDOM from "react-dom";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const URL = "https://poetrydb.org/random,author/1;Dickinson";

export class Random extends React.Component {
  constructor(props) {
    super(props);
    this.getPoem = this.getPoem.bind(this);
    this.state = {
      poem: [],
      dragged: []
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
  }

  getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  return (
    <React.Fragment>
      <li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={provided.draggableProps.style}
        className={snapshot.isDragging ? "dragging" : ""}
      >
        {item.label}
      </li>
    </React.Fragment>
  );
};
  render() {
    return (
      <>
        <button type="button" onClick={e => this.handleClick(e)}>
          next
        </button>

        <DragDropContext>
          {this.state.poem.map((item, i) => (
            <div key={"block-" + i}>
              {item.lines.map((line, i) => (
                <div key={"line-" + i}>
                  {line.split(" ").map((word, i) => (
                    <span className="word" key={"word-" + i}>
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </DragDropContext>
        <div id="droppable"></div>
      </>
    );
  }
}
