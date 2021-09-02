import React, { useState, useEffect } from "react";
import axios from "axios";

import { Poem } from "./poem.jsx";
import { Droppable } from "./droppable.jsx";

function Random() {
  const [poem, setPoem] = useState(null);

  useEffect(() => {
    axios.get("https://poetrydb.org/random,author/1;Dickinson").then(res => {
      setPoem(res.data);
    });
  }, []);

  const handleClick = poet => e => {
    e.preventDefault();
    axios.get(`https://poetrydb.org/random,author/1;${poet}`).then(res => {
      setPoem(res.data);
    });
  };

  return (
    <>
      <button type="button" onClick={handleClick("Dickinson")}>dickinson<
rshother'
tton>

      <button type="button" onClick={handleClick("Shakespeare")}>
        shakespeare
      </button>

      {poem && <Poem poem={poem} />}

      <Droppable />
    </>
  );
}

export default Random;
