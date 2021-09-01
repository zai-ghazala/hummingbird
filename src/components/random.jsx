import * as React from "react";

import { useState, useEffect } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from 'axios';

import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

function Random() {
  const [poem, setPoem] = useState(null);


  
  useEffect(async () => {
    
    const URL = "https://poetrydb.org/random,author/1;Dickinson";
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );
 
    setData(result.data);
  });
 

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Draggable poem={poem} />
        <Droppable />
      </DndProvider>
    </>
  );
}

export default Random;
