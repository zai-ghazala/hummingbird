import React, { useState, useEffect } from "react"; // import useState
import * as axios from "axios";

import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

const URL = "https://poetrydb.org/random,author/1;Dickinson";

const Random(props) {
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

  return (
    <>
      <button type="button" onClick={e => this.handleClick(e)}>
        next
      </button>

      <DndProvider backend={HTML5Backend}>
        <Draggable poem={poem} />
        <Droppable />
      </DndProvider>
    </>
  );
}

export default Random;
