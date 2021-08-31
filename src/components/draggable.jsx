import * as React from "react";
import { useState, useEffect } from "react";
import * as axios from "axios";
import { useDrag } from "react-dnd";

function Draggable() {
  const [poem, setPoem] = useState([]);

  const getPoem = () => {
    fetch("https://poetrydb.org/random,author/1;Dickinson")
      .then(res => res.json())
      .then(result => {
        setPoem(result);
      })
      .catch(error => console.log("error"));
  };

  useEffect(() => {
    getPoem();
  }, []); // <-- Have to pass in [] here!

  const handleClick = e => {
    e.preventDefault();
    getPoem();
  };

  const [, drag] = useDrag(() => ({ type: "draggable" }));

  console.log(poem.lines);
  return (
    <>
      {poem.map((item, i) => (
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
}

export default Draggable;
