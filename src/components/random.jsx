import * as React from "react";

import { useState, useEffect } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

function Random() {
  const [poem, setPoem] = useState({});
  
  useEffect(() => {
    this.fetchData();
  }, []);


  const fetchData = () => {
      const url = "https://poetrydb.org/random,author/1;Dickinson";
      fetch(url)
          .then(response => setPoem(response.json()))
          .catch(error => console.log(error));
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {poem && <Draggable dataObject={poem} />}
        <Droppable />
      </DndProvider>
    </>
  );
}

export default Random;
