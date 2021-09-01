import React, { useState, useEffect } from "react";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import Draggable from "../components/draggable.jsx";
import Droppable from "../components/droppable.jsx";

function Random() {
  const [poem, setPoem] = useState([]);


   useEffect(()=>{
        console.log(poem);
            axios
      .get("https://poetrydb.org/random,author/1;Dickinson")
      .then(res => {
        console.log(res.data);
        setPoem(res.data);
      })
      .catch(err => {
        console.log(err.message);
       })
     
     
     
    }, [poem]) 
  

  
 

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {poem && <Draggable poemLines={poem} />}
        <Droppable />
      </DndProvider>
    </>
  );
}

export default Random;
