import React, { useState, useEffect } from "react";
import axios from "axios";

import { Poem } from "./poem.jsx";
import { Droppable } from "./droppable.jsx";

function Random() {
  const [poem, setPoem] = useState(null);
  const [poet, setPoet] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://poetrydb.org/random,author/1;Dickinson://poetrydb.org/random,author/1;Dickinson"
      )
      .then(res => {
        setPoem(res.data);
      });
  }, []);

  const getRandom = poet => {
    axios.get(`https://poetrydb.org/random,author/1;${poet}`).then(res => {
      setPoem(res.data);
    });
  };

  const handleClick = () => {
    this.getRandom();
  };

  return (
    <>
      
        
{poem && <Poem poem={poem} />}

      <Droppable />
    </>
  );
}

export default Random;
