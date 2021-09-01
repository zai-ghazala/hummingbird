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
      }, []);

    getRandom = () => {
      
      axios.get(`
    };

    const results = poems.filter(person => person.includes(poet));
    setPoet(results);
  }, [poet]);

  const handleChange = event => {
    setPoet(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="poet"
        value={poet}
        onChange={handleChange}
      />
      {poem && <Poem poem={poem} />}

      <Droppable />
    </>
  );
}

export default Random;
