import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

function Random() {
  const [poem, setPoem] = useState();

  
  useEffect(() => {
    console.log('hello');
      const url = "https://poetrydb.org/random,author/1;Dickinson";
    fetch(url)
      .then(response => response.json())
      .then(poem => {
        setPoem(poem.text);
      });
  }, [setPoem]);
  
  
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {<Draggable poem={poem} />}
        <Droppable />
      </DndProvider>
    </>
  );
}

export default Random;
