import React, { useState, useEffect } from "react";
import axios from "axios";

import { Poem } from "./poem";
import { Space } from "./space";

export const Random = () => {
  const [poem, setPoem] = useState(null);
  const [word, setCurrentWord] = useState('');
  

  useEffect(() => {
    axios.get("https://poetrydb.org/random,author/1;Dickinson").then(res => {
      setPoem(res.data);
    });
  }, []);

  const handleClick = (poet, button) => e => {
    e.preventDefault();
    axios.get(`https://poetrydb.org/random,author/1;${poet}`).then(res => {
      setPoem(res.data);
    });
  };
  
   const handleWord = (word) => {
    setCurrentWord(word)
  }
  

  return (
    <>
      <div className="buttons">
        <button type="button" onClick={handleClick("Dickinson")}>
          emily dickinson
        </button>
        <button type="button" onClick={handleClick("Rossetti")}>
          christina rossetti
        </button>
        <button type="button" onClick={handleClick("Bronte")}>
          emily bronte
        </button>
      </div>

      <div className="poem">
        <div className="words">{poem && <Poem poem={poem} handler={handleWord}/>}</div>

        <div id="space-parent">
          <div id="space">
            <Space/>
          </div>

          <div className="site-title">
            <img
              className="bird bird--left landscape"
              src="https://cdn.glitch.com/ff50bc56-1555-4860-bbd4-f822f0922562%2Fhummingbird-left.png"
            />

            <div className="site-info">
              <h1>hope is the thing with feathers</h1>
              <span>
                assemble your very own poem inspired by emily dickinson,
                christina rossetti and emily bronte - just drag n drop the
                “magnetic” words
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Random;
