import React, { useState, useEffect } from "react";
import axios from "axios";

import { Poem } from "./poem.jsx";
import { Droppable } from "./droppable.jsx";

function Random() {
  const [poem, setPoem] = useState(null);
  const [colour1, setColour1] = useState(null);
  const [colour2, setColour2] = useState(null);
  conEffect(() => {
    axios.get("https://poetrydb.org/random,author/1;Dickinson").then(res => {
      setPoem(res.data);
    });
  }, []);

  const handleClick = poet => e => {
    e.preventDefault();
    axios.get(`https://poetrydb.org/random,author/1;${poet}`).then(res => {
      setPoem(res.data);
      setColour(!colour);
      setColour(colour ? null : "pink");
    });
  };

  return (
    <>
      <button
        style={{ background: colour }}
        type="button"
        onClick={handleClick("Dickinson")}
      >
        emily dickinson
      </button>
      <button style={{background: colour}} type="button" onClick={handleClick("Rossetti")}>
        christina rossetti
      </button>
      <button type="button" onClick={handleClick("Bronte")}>
        emily bronte
      </button>
      {poem && <Poem poem={poem} />}
      <Droppable />
    </>
  );
}

export default Random;

