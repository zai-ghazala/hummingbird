import * as React from "react";
import { useState, useEffect } from "react";
import * as axios from "axios";
import { useDrag } from "react-dnd";

function Draggable() {
  const [poem, setPoem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://poetrydb.org/random,author/1;Dickinson");
      const json = await res.json();
      setPoem(json.hits);
    };
    fetchData();
  }, [setPoem]);

  const handleClick = e => {
    e.preventDefault();
    getPoem();
  };

  const [, drag] = useDrag(() => ({ type: "draggable" }));

  console.log(poem);
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
