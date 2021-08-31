import * as react from "react";
import { useState, useEffect } from "react";
import * as axios from "axios";
import { useDrag } from "react-dnd";

const Draggable = props => {
  const [poem, setPoem] = useState([]);

  const getPoem = () => {
    axios
      .get(URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(({ data }) => {
        setPoem(data);
      })
      .catch(err => {});
  };

  useEffect(() => {
    getPoem();
  }, []);

  const handleClick = e => {
    e.preventDefault();
    getPoem();
  };

  const [, drag] = useDrag(() => ({ type: "draggable" }));

  console.log(poem.lines);
  return (
    <>
      {props.map((item, i) => (
        <div key={"block-" + i}>
          {item.lines.map((line, i) => (
            <div key={"line-" + i}>
              {line.split(" ").map((word, i) => (
                <span ref={drag} className="word" key={"word-" + i}>
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Draggable;
