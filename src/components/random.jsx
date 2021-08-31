import * as React from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

const Random = () => {
  return (
    <>
      <button type="button" onClick={e => this.handleClick(e)}>
        next
      </button>

      <DndProvider backend={HTML5Backend}>
        <Draggable />
        <Droppable />
      </DndProvider>
    </>
  );
};

export default Random;
