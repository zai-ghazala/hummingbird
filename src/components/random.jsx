import * as React from "react";

import { useState, useEffect } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

function Random() {
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    const URL = "https://poetrydb.org/random,author/1;Dickinson";
    const fetchData = async () => {
      const result = await axios(URL);

      setPoem(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {poem && <Draggable poem={poem} />}
        <Droppable />
      </DndProvider>
    </>
  );
}

export default Random;
