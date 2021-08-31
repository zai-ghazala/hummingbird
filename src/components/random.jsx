import * as React from "react";
import * as axios from "axios";
import * as ReactDom from "react-dom";
import { Draggable, Droppable } from "@syncfusion/ej2-base";

const URL = "https://poetrydb.org/random,author/1;Dickinson";

export class Random extends React.Component {
  constructor(props) {
    super(props);
    this.getPoem = this.getPoem.bind(this);
    this.handleLoad = this.handleLoad.bind(this);

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
    let draggable = new Draggable(document.getElementsByClassName("word"), {
      clone: true
    });

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
                  <span className="word" key={"word-" + i}>
                    {word}
                  </span>
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

ReactDom.render(<Random />, document.getElementById("poem"));
