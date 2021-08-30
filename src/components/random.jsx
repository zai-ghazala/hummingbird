import * as React from "react";
import * as axios from "axios";
import * as dragula from "react-dragula";

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
    var draggable = React.findDOMNode(this);
    var droppable = React.findDOMNode(this);

    
    dragula([draggable, droppable]);
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
                      <span className="word">{word}</span>
                  ))}
                </div>
              ))}
            </div>
          ))}
        <div className="droppable"></div>
      </>
    );
  }
}
