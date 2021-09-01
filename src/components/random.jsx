import * as React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

const Random = () => {
  const [poem, setPoem] = useState(null);

  const URL = "https://poetrydb.org/random,author/1;Dickinson";

  useEffect(() => {
    fetchPoem();
  }, [poem]);

  const fetchPoem = () => {
    axios
      .get(URL)
      .then(response => {
        const lines = response.data;
        setPoem(lines);
      })
      .catch(error => console.error(`error: ${error}`));
  };

  const handleClick = e => {
    e.preventDefault();
    fetchPoem();
  };

  return (
    <>
      <button type="button" onClick={e => handleClick(e)}>
        next
      </button>

      <DndProvider backend={HTML5Backend}>
        <Draggable poem={poem} />
        <Droppable />
      </DndProvider>
    </>
  );
};

export default Random;
