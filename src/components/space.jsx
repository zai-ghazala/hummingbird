import React, { useState } from "react";
import { DropTarget } from "react-drag-drop-container";

import { ref, push, serverTimestamp } from "firebase/database";
import { db } from "../utils/firebase"

export const Space = props => {
  const [composedPoem, setComposedPoem] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [newLineSuccess, setNewLineSuccess] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);
  const [backspaceSuccess, setBackspaceSuccess] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailure, setSaveFailure] = useState(false);

  const [username, setUsername] = useState('');
  const [updated, setUpdated] = useState(username);

  const handleDrop = currentWord => {
    setComposedPoem([...composedPoem, currentWord]);
    setNewLineSuccess(false);
    setClearSuccess(false);
    setCopySuccess(false);
    setBackspaceSuccess(false);
    setSendRequest(false);
    setSaveSuccess(false);
    setSaveFailure(false);
  };

  const copy = () => {
    let text = composedPoem.join(" ");

    text = text
      .replace(/\[object Object\] /g, '\n')
      .replace(/ \[object Object\] /g, '\n');

    navigator.clipboard.writeText(text).then(function() {
      if (composedPoem.length != 0) {
        setCopySuccess(true);
        setNewLineSuccess(false);
      }
    });
  };

  const clear = () => {
    if (composedPoem.length != 0) {
      setComposedPoem([]);
      setClearSuccess(true);
    }
  };

  const newLine = () => {
    if (composedPoem.length != 0) {
      setComposedPoem([...composedPoem, <><br/></>]);
      setNewLineSuccess(true);
    }
  };


  const backspace = () => {
    if (composedPoem.length != 0) {
      const temp = [...composedPoem];
      temp.pop();
      setComposedPoem(temp);
      setBackspaceSuccess(true);
    }
  };

  const send = () => {
    setSendRequest(true)
  }
        
  // Push Function
  const handleClick = () => {

    if (composedPoem.length != 0) {
      let text = composedPoem.join(' ');

      text = text
        .replace(/\[object Object\] /g, '\n')
        .replace(/ \[object Object\] /g, '\n')
        .replace('[object Object]', '')

      setUpdated(username);
      push(ref(db, 'poems/'), {
        poem: text,
        name: username,
        timestamp: serverTimestamp(),
      });
      setSaveSuccess(true);
    }
    else {
      setSaveFailure(true);
    }
  }

  return (
    <>
      <div id="space">
        <div className="compose-message">
          {saveFailure 
            ? "oops, empty poem"
            : clearSuccess
            ? "start over?"
            : copySuccess
            ? "copied!"
            : backspaceSuccess
            ? "backspace"
            : newLineSuccess
            ? "new line"
            : saveSuccess 
            ? `wow published! thanks ${username}`
            : sendRequest 
            ? "save & send?"
            : null}
        </div>

        { sendRequest && <div className="save"><input type="text" name="username" placeholder="your name here" onChange={e => setUsername(e.target.value)} value={username}/><button type="button" 
      onClick={handleClick}>publish</button></div> }

          
        <DropTarget
          handleDrag={props.handleDrag}
          onHit={() => handleDrop(props.currentWord)}
        >
          <div className={sendRequest ? 'enter__send-request enter' : 'enter'}>
            {composedPoem.map((word, i) => {
              return <span key={word + i}>{word} </span>;
            })}
          </div>
        </DropTarget>
        <div className="footer-buttons">
          <button className={clearSuccess || composedPoem.length === 0
              ? 'disabled' : null} type="button" onClick={send}>
              <span className="monospace">&#x2709;</span>
            </button>
          <button className={copySuccess || clearSuccess || composedPoem.length === 0
            ? 'disabled' : null} type="button" onClick={copy}>
            ⎘
          </button>
          <button className={clearSuccess|| composedPoem.length === 0
            ? 'disabled' : null} type="button" onClick={clear}>
            ␡
          </button>
          <button className={clearSuccess || composedPoem.length === 0
            ? 'disabled' : null} type="button" onClick={backspace}>
            ⌫
          </button>
          <button className={clearSuccess || composedPoem.length === 0
            ? 'disabled' : null} type="button" onClick={newLine}>
            ↲
          </button>
        </div>
      </div>
    </>
  );
};
