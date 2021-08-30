import * as React from "react";
import * as axios from "axios";
import {
  Draggable,
  Droppable,
  DragComponent,
  DragState
} from "react-dragtastic";
const URL = "https://poetrydb.org/random,author/1;Dickinson";

export class Random extends React.Component {
  constructor(props) {
    super(props);
    this.getPoem = this.getPoem.bind(this);
    this.state = {
      poem: []
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
                  <Draggable>
                    {({ isDragging, events }) => (
                      <span {...events} className="word" key={"word" + i}>
                        {word}
                      </span>
                    )}
                  </Draggable>
                ))}
                )
              </div>
            ))}
          </div>
        ))}
        <div className="droppable"></div>
      </>
    );
  }
}
