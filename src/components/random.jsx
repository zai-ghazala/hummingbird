import React, { useState, useEffect } from "react";
import axios from "axios";
import { Draggable } from "../components/draggable.jsx";
import { Droppable } from "../components/droppable.jsx";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function Random() {
  const [poem, setPoem] = useState(null);
  
  useEffect(() => {
    axios
      .get("https://poetrydb.org/random,author/1;Dickinson")
      .then(res => {
        setPoem(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
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
