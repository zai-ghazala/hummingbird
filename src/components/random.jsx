import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { ref, get } from "firebase/database";

import { Poem } from "./poem";
import { Space } from "./space";

import { rossetti } from '../assets/data/Rossetti.js';
import { bronte } from '../assets/data/Bronte.js'
import { dickinson } from '../assets/data/Dickinson.js'

export const Random = () => {
  const [poem, setPoem] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [submission, setSubmission] = useState(false);
  const [author, setAuthor] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [title, setTitle] = useState("");

  const getPoem = (poet) => {
    const getRandom = (poet) => {
      let poems = Object.values(poet)
      return poems[parseInt(Math.random() * poems.length)]
    }
    setPoem(getRandom(poet).lines);
    setAuthor(getRandom(poet).author);
    setTitle(getRandom(poet).title);
    setSubmission(false)
  }

  useEffect(() => {
    getPoem(dickinson);
  }, []);

  const handleClick = (poet) => e => {
    e.preventDefault();
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
  }




  return (
    <>
      <div className="buttons">
        <button type="button" className="author" onClick={handleClick(dickinson)}>
          <span>⟳</span>
          <br />
          Emily Dickinson
        </button>
        <button type="button" className="author" onClick={handleClick(rossetti)}>
          <span>⟳</span>
          <br />
          Christina Rossetti
        </button>
        <button type="button" className="author"  onClick={handleClick(bronte)}>
          <span>⟳</span>
          <br />
          Emily Brontë
        </button>

      </div>
      <div className="buttons">
      <button type="button" onClick={random}>
          <span>⟳</span>
          <br />
          random submission
        </button>
      </div>
      <div className="poem">
        {poem && <Poem poem={poem} handleDrag={handleDrag} />}

        {submission ? <div className="poem-data">— by {author} at {timestamp}</div> : title && author ? <div className="poem-data">— <span>{title}</span> by {author.replace('Bronte', 'Brontë')}</div> : null}
    </div>
        <Space currentWord={currentWord}/>
  </>
  );
};

export default Random;
