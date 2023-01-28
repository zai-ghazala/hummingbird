import React, { useState, useEffect, useRef } from "react";
import { db } from "../utils/firebase";
import { ref, get } from "firebase/database";

import { Poem } from "./poem";
import { Space } from "./space";

import { rossetti } from '../assets/data/Rossetti.js';
import { bronte } from '../assets/data/Bronte.js'
import { dickinson } from '../assets/data/Dickinson.js'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
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
  const shuffleRef = useRef();

  const [poem, setPoem] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [submission, setSubmission] = useState(false);
  const [author, setAuthor] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [title, setTitle] = useState("");

  const { height, width } = useWindowDimensions();

  const scroll = () => {
    poemRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })    
  }
  

  const getPoem = (poet) => {
    const getRandom = (poet) => {
      let poems = Object.values(poet)
      return poems[parseInt(Math.random() * poems.length)]
    }
    setPoem(getRandom(poet).lines);
    setAuthor(getRandom(poet).author);
    setTitle(getRandom(poet).title);
    setSubmission(false);
    
    if (scroll && height > width ) {
      scroll()
    }
    }

  useEffect(() => {
    getPoem(dickinson);
  }, []);

  const shuffle = () => e => {
    const newPoem = poem.map(line => ' ' + line + ' ');
    console.log(newPoem)
      const shuffled = newPoem.join('').replace(' ', '').split(' ').sort(() => Math.floor(Math.random() * Math.floor(3)) - 1).join(' ');
      setPoem([shuffled])

  };

  const handleClick = (poet) => e => {
    getPoem(poet);
  };


  const handleDrag = (word) => {
    setCurrentWord(word);
  };

const random = () => {
  function getRandomProperty(obj) {
    const keys = Object.keys(obj);
  
    return keys[Math.floor(Math.random() * keys.length)];
  }
  
    const firebaseRef = ref(db, 'poems')

    get(firebaseRef).then((snapshot) => {
        if (snapshot.exists()) {
          
            let poems = [];
            poems.push(snapshot.val())
            const random = poems[0][getRandomProperty(poems[0])]

            setPoem(random['poem'].split('\n'));
            setAuthor(random['name'])
            setTimestamp(new Date(random['timestamp']).toLocaleDateString());
            setSubmission(true)
          
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
    });
    scroll();
  }

  return (
    <>
      <div className="buttons">
        <button type="button" className="random author" onClick={handleClick(dickinson, true)}>
          <span>⟳</span>
          <br />
          Emily Dickinson
        </button>
        <button type="button" className="random author" onClick={handleClick(rossetti, true)}>
          <span>⟳</span>
          <br />
          Christina Rossetti
        </button>
        <button type="button" className="random author"  onClick={handleClick(bronte, true)}>
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


      <button type="button" ref={shuffleRef} onClick={shuffle()} className="shuffle">
          shuffle
        </button>
      

      <div ref={poemRef} className="poem">
        {poem && <Poem poem={poem} handleDrag={handleDrag} />}

        {submission ? <div className="poem-data">— by {author} on {timestamp}</div> : title && author ? <div className="poem-data">— <span>{title}</span> by {author.replace('Bronte', 'Brontë')}</div> : null}


    <button type="button" onClick={e => scroll(e)} className="shuffle">
          back to top
        </button>
    </div>


        <Space currentWord={currentWord}/>
  </>
  );
};

export default Random;
