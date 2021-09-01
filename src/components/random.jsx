import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

function Random() {
  const [poem, setPoem] = useState([]);

  const URL = "https://poetrydb.org/random,author/1;Dickinson";

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {poem ? <Draggable poem={poem} /> : null}
        <Droppable />
      </DndProvider>
    </>
  );
}

export default Random;
