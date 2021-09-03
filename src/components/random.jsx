import React, { useState, useEffect } from "react";
import axios from "axios";
import{ DragDropContext, Droppable } from "react-beautiful-dnd"

import { Poem } from "./poem.jsx";
import { Space } from "./space.jsx";

function Random() {
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    axios.get("https://poetrydb.org/random,author/1;Dickinson").then(res => {
      setPoem(res.data);
    });
  }, []);

  const handleClick = (poet, button) => e => {
    e.preventDefault();
    axios.get(`https://poetrydb.org/random,author/1;${poet}`).then(res => {
      setPoem(res.data);
    });
  };

  return (
    <>
      <div className="buttons">
        <button type="button" onClick={handleClick("Dickinson")}>
          emily dickinson
        </button>
        <button type="button" onClick={handleClick("Rossetti")}>
          christina rossetti
        </button>
        <button type="button" onClick={handleClick("Bronte")}>
          emily bronte
        </button>
      </div>

      <DragDropContext>
        <div className="poem">
        <div>{poem && <Poem poem={poem} />}</div>
        <Droppable droppableId="droppable"><Space /></Droppable>
      </div>
          </DragDropContext>

    </>
  );
}

export default Random;
