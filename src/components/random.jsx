import React, { useState, useEffect, useRef } from "react";
import { db } from "../utils/firebase";
import { useIsOnline } from 'react-use-is-online';
import { ref, get } from "firebase/database";

import { Poem } from "./poem";
import { Space } from "./space";

import { rossetti } from "../assets/data/Rossetti.js";
import { bronte } from "../assets/data/Bronte.js";
import { dickinson } from "../assets/data/Dickinson.js";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const Random = () => {
  const poemRef = useRef();
  
  const { isOnline, isOffline, error } = useIsOnline();

  const [poem, setPoem] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [submission, setSubmission] = useState(false);
  const [author, setAuthor] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [title, setTitle] = useState("");

  const { height, width } = useWindowDimensions();

  const scroll = () => (e) => {
    poemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getPoem = (poet) => {
    const getRandom = (poet) => {
      let poems = Object.values(poet);
      return poems[parseInt(Math.random() * poems.length)];
    };
    setPoem(getRandom(poet).lines);
    setAuthor(getRandom(poet).author);
    setTitle(getRandom(poet).title);
    setSubmission(false);
  };

  useEffect(() => {
    getPoem(dickinson);
  }, []);

  const shuffle = () => (e) => {
    const newPoem = poem.map((line) => " " + line + " ");
    const shuffled = newPoem
      .join("")
      .replace(" ", "")
      .split(" ")
      .sort(() => Math.floor(Math.random() * Math.floor(3)) - 1)
      .join(" ");
    setPoem([shuffled]);
  };

  const handleClick = (poet) => (e) => {
    getPoem(poet);

    if (height > width) {
      poemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDrag = (word) => {
    setCurrentWord(word);
  };

  const random = () => {
    function getRandomProperty(obj) {
      const keys = Object.keys(obj);

      return keys[Math.floor(Math.random() * keys.length)];
    }

    const firebaseRef = ref(db, "poems");

    {isOffline ?
      poemRef.current.innerHTML = 'Go online first :)'
    :
      get(firebaseRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            let poems = [];
            poems.push(snapshot.val());
            const random = poems[0][getRandomProperty(poems[0])];

            setPoem(random["poem"].split("\n"));
            setAuthor(random["name"]);
            setTimestamp(new Date(random["timestamp"]).toLocaleDateString());
            setSubmission(true);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        })
    }

    poemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
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

      <div className="buttons">
        <button type="button" onClick={random} className="random">
          <span>⟳</span>
          <br />
          random submission
        </button>
      </div>

      <div className="svg-button">
        <button type="button" onClick={shuffle()} className="shuffle">
          <svg width="100%" height="100%">
            <defs>
              <path id="text-path" d="M 75 73 q 64 13 153 -15" />
            </defs>

            <path d="M 75 73 q 64 13 153 -15" className="bendy" />
            <text>
              <textPath
                xlinkHref="#text-path"
                startOffset="50%"
                textAnchor="middle"
              >
                shuffle words!
              </textPath>
            </text>
          </svg>
        </button>
      </div>

      <div ref={poemRef} className="poem">
        {poem && <Poem poem={poem} handleDrag={handleDrag} />}

        {submission ? (
          <div className="poem-data">
            — by {author} on {timestamp}
          </div>
        ) : title && author ? (
          <div className="poem-data">
            — <span>{title}</span> by {author.replace("Bronte", "Brontë")}
          </div>
        ) : null}

        <div className="svg-button">
          <button type="button" onClick={scroll()} className="shuffle">
            <svg width="100%" height="100%">
              <defs>
                <path id="text-path-2" d="M 75 76 q 71 -28 139 10" />
              </defs>

              <path d="M 75 76 q 71 -28 139 10" className="bendy" />
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
      <Space currentWord={currentWord} />
    </>
  );
};

export default Random;
