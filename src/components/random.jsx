import React, { useState, useEffect } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";


function fetchData() {
  return fetch('https://poetrydb.org/random,author/1;Dickinson')
    .then(response => response.json())
  .catch(error => console.log(error));
}

function Random() {
  const [poem, setPoem] = useState({});


 useEffect(() => {
    fetchData.then(setPoem);
    console.log("useEffect ran...");
  }, []);


  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {<Draggable dataObject={poem} />}
        <Droppable />
      </DndProvider>
    </>
  );
}

export default Random;
