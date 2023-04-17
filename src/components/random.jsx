import React, { useState, useEffect, useRef } from "react";
import { Poem } from "./poem";
import { Space } from "./space";

import { rossetti } from "../assets/data/Rossetti.js";
import { bronte } from "../assets/data/Bronte.js";
import { dickinson } from "../assets/data/Dickinson.js";

export const Random = () => {
  const poemRef = useRef();
  const buttonsRef = useRef();

  const [isSticky, setIsSticky] = useState(false);  

  const [poem, setPoem] = useState([]);
  const [shuffledPoem, setShuffledPoem] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [submission, setSubmission] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  const [isShuffled, setShuffled] = useState(false);

  const scroll = () => (e) => {
    poemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getPoem = (poet) => {
    const getRandom = (poet) => {
      let poems = Object.values(poet);
      return poems[parseInt(Math.random() * poems.length)];
    };

    const random = getRandom(poet);
    setPoem(random.lines);
    setAuthor(random.author);
    setTitle(random.title);
    setShuffled(false)
  };
  
  useEffect(() => {
    getPoem(dickinson);
  }, []);

  useEffect(() => {
    const header = buttonsRef?.current 
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.isIntersecting, {
          rootMargin: '-100% 0px 0px 0px', 
          threshold: 0})}
    )
    if (header) {
      observer.observe(header)
    }    
  }, [buttonsRef])

  const shuffle = () => e => {

    if (!isShuffled) {
    const newPoem = poem.map((line) => " " + line + " ");
    const shuffled = newPoem
      .join("")
      .replace(" ", "")
      .split(" ")
      .sort(() => Math.floor(Math.random() * Math.floor(3)) - 1)
      .join(" ");
    setShuffledPoem([shuffled]);
    setShuffled(true)
    }
    else {
      setShuffledPoem(poem);
      setShuffled(false)
    }
  };

  const handleClick = (poet) => (e) => {
    getPoem(poet);

  };

  const handleDrag = (word) => {
    setCurrentWord(word);
  };
    
  return (
    <>
    <nav id="buttons" ref={buttonsRef} className={isSticky ? null: 'stuck'}>

    <div className="composeMessage randomiseMessage">randomise the current poem</div>
      <div className="buttons">
        <button
          type="button"
          className="random author"
          onClick={handleClick(dickinson)}
        >
          <span>⟳</span>
          <br />
          Emily Dickinson
        </button>
        <button
          type="button"
          className="random author"
          onClick={handleClick(rossetti)}
        >
          <span>⟳</span>
          <br />
          Christina Rossetti
        </button>
        <button
          type="button"
          className="random author"
          onClick={handleClick(bronte)}
        >
          <span>⟳</span>
          <br />
          Emily Brontë
        </button>
      </div>
</nav>
<main ref={poemRef}>
      <div className={isSticky ? 'svgButton shuffle': 'svgButton shuffle stuck'}>
        <button type="button" onClick={shuffle()} className="shuffle">
          <svg width="100%" height="100%">
            <defs>
              <path id="text-path" d="M 68 59 q 84 19 171 -3" />
            </defs>

            <path d="M 68 59 q 84 19 171 -3" className="bendy" />
            <text>
              <textPath
                xlinkHref="#text-path"
                startOffset="50%"
                textAnchor="middle"
              >
                {isShuffled ? 'reset' : 'shuffle words!'}
              </textPath>
            </text>
          </svg>
        </button>
      </div>

      <div className="poem">
        {poem && <Poem poem={isShuffled ? shuffledPoem : poem} handleDrag={handleDrag} />}

        {submission ? (
          <div className="poem-data">
            — by {author}<br/></div>
        ) : title && author ? (
          <div className="poem-data">
            — <span>{title}</span> by {author.replace("Bronte", "Brontë")}
          </div>
        ) : null}

        <div className="svgButton">
          <button type="button" onClick={scroll()} className="shuffle">
            <svg width="100%" height="100%">
              <defs>
                <path id="text-path-2" d="M 68 79 q 84 -19 171 3" />
              </defs>

              <path d="M 68 79 q 84 -19 171 3" className="bendy" />
              <text>
                <textPath
                  xlinkHref="#text-path-2"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  back to top
                </textPath>
              </text>
            </svg>
          </button>
          </div>
        </div>
      </main>
      <Space currentWord={currentWord} />
    </>
  );
};

export default Random;
