import * as React from "react";

import { useState, useEffect } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

const Random = () => {
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    const URL = "https://poetrydb.org/random,author/1;Dickinson";
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const json = await response.json();
        console.log(json);
        setPoem(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Draggable poem={poem} />
        <Droppable />
      </DndProvider>
    </>
  );
};

export default Random;
