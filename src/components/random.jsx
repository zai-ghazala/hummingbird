import * as React from "react";
import * as axios from "axios";
import SplitText from "@moxy/react-split-text";
import Draggable from "react-draggable";

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
        <div id="container">
          <button type="submit" onClick={e => this.handleClick(e)}>
            next
          </button>

          {this.state.poem.map((item, i) => (
            <div key={"block-" + i}>
              {item.lines.map((line, i) => (
                <p key={"line-" + i}>
                  <Draggable>
                    <SplitText className="word">{line}</SplitText>
                  </Draggable>
                </p>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }
}
