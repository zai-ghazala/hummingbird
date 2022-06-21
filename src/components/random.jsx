import React, { useState, useEffect } from "react";
import axios from "axios";

import { Poem } from "./poem";
import { Space } from "./space";

export const Random = () => {
  const [poem, setPoem] = useState(null);
  const [currentWord, setCurrentWord] = useState("");

  useEffect(() => {
    axios.get("https://poetrydb.org/random,author/1;Dickinson").then(res => {
      setPoem(res.data);
    });
  }, []);

  const handleClick = (poet) => e => {
    e.preventDefault();
    axios.get(`https://poetrydb.org/random,author/1;${poet}`).then(res => {
      setPoem(res.data);
    });
  };

  const handleDrag = word => {
    setCurrentWord(word);
  };

  return (
    <>
      <div className="buttons">
        <button type="button" onClick={handleClick("Dickinson")}>
          <span>⟳</span>
          <br />
          Emily Dickinson
        </button>
        <button type="button" onClick={handleClick("Rossetti")}>
          <span>⟳</span>
          <br />
          Christina Rossetti
        </button>
        <button type="button" onClick={handleClick("Emily Bronte")}>
          <span>⟳</span>
          <br />
          Emily Brontë
        </button>
      </div>
      <div className="poem">
        {poem && <Poem poem={poem} handleDrag={handleDrag} />}
      </div>
      <Space currentWord={currentWord} />
    </>
  );
};

export default Random;
