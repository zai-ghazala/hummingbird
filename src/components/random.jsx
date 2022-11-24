import React, { useState, useEffect } from "react";
import axios from "axios";

import { db } from "../utils/firebase";
import { ref, get } from "firebase/database";

import { Poem } from "./poem";
import { Space } from "./space";

export const Random = () => {
  const [poem, setPoem] = useState([]);
  const [currentWord, setCurrentWord] = useState("");

  const [submission, setSubmission] = useState(false);

  const [author, setAuthor] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("https://poetrydb.org/random,author/1;Dickinson").then(res => {
      setPoem(res.data[0].lines);
      setAuthor(res.data[0].author);
      setTitle(res.data[0].title);
      setSubmission(false)
    });
  }, []);

  const handleClick = (poet) => e => {
    e.preventDefault();
    axios.get(`https://poetrydb.org/random,author/1;${poet}`).then(res => {
      setPoem(res.data[0].lines);
      setAuthor(res.data[0].author);
      setTitle(res.data[0].title);
      setSubmission(false)
    });
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
        <button type="button" className="author" onClick={handleClick("Dickinson")}>
          <span>⟳</span>
          <br />
          Emily Dickinson
        </button>
        <button type="button" className="author" onClick={handleClick("Rossetti")}>
          <span>⟳</span>
          <br />
          Christina Rossetti
        </button>
        <button type="button" className="author"  onClick={handleClick("Emily Brontë")}>
          <span>⟳</span>
          <br />
          Emily Bronte
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
