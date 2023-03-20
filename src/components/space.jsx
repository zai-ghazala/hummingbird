import React, { useState, useEffect, useRef } from 'react';
import { DropTarget } from 'react-drag-drop-container';
import { ref, push, serverTimestamp } from 'firebase/database';
import { db } from '../utils/firebase';

export const Space = (props) => {
  const [composedPoem, setComposedPoem] = useState([]);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [newLineSuccess, setNewLineSuccess] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);
  const [backspaceSuccess, setBackspaceSuccess] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveFailure, setSaveFailure] = useState(false);
  const [message, setMessage] = useState(null);

  const [username, setUsername] = useState('');
  const [updated, setUpdated] = useState(username);
  const scrollRef = useRef();


  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [composedPoem]);

  const handleDrop = (currentWord) => {
    setComposedPoem([...composedPoem, currentWord]);
    setNewLineSuccess(false);
    setClearSuccess(false);
    setCopySuccess(false);
    setBackspaceSuccess(false);
    setSendRequest(false);
    setSaveSuccess(false);
    setSaveFailure(false);
    setMessage(null);
  };

  useEffect(() => {
    setMessage('drag & drop your poem here');
  }, []);

  const copy = () => {
    let text = composedPoem.join(' ');

    text = text
      .replace(/\[object Object\] /g, '\n')
      .replace(/ \[object Object\] /g, '\n');

    navigator.clipboard.writeText(text).then(function () {
      if (composedPoem.length != 0) {
        setCopySuccess(true);
        setNewLineSuccess(false);
        setMessage('copied to clipboard!');
      }
    });
  };

  const clear = () => {
    if (composedPoem.length != 0) {
      setComposedPoem([]);
      setClearSuccess(true);
      setMessage('start over?');
    }
  };

  const newLine = () => {
    if (composedPoem.length != 0) {
      setComposedPoem([
        ...composedPoem,
        <>
          <br />
        </>,
      ]);
      setSendRequest(false);
      setNewLineSuccess(true);
      setMessage('new line');
    }
  };

  const backspace = () => {
    if (composedPoem.length != 0) {
      const temp = [...composedPoem];
      temp.pop();
      setSendRequest(false);
      setComposedPoem(temp);
      setBackspaceSuccess(true);
      setMessage('backspace');
    }
  };

  const send = () => {
    setSendRequest(true);
    setMessage('save and send?');
  };

  const share = () => {
      if (navigator.share) {
        let text = composedPoem.join(' ');

        text = text
          .replace(/\[object Object\] /g, '\n')
          .replace(/ \[object Object\] /g, '\n');

        navigator.share({
          text: text,
          url: 'https://www.hummingbird.zaiz.ai',
        }).then(() => {
          setMessage('thanks for sharing!')
          setShareSuccess(true);
        })
        .catch(console.erroor);
      } else {
        setMessage('sharing not supported :(')
      }
  };

  // Push Function
  const handleClick = () => {
    let text = composedPoem.join(' ');

    text = text
      .replace(/\[object Object\] /g, '\n')
      .replace(/ \[object Object\] /g, '\n')
      .replace('[object Object]', '');

    setUpdated(username);

    if (username.length === 0) {
      setMessage('oops blank name');
      setSaveSuccess(false);
    } else if (composedPoem.length > 200 || username.length > 20) {
      setMessage('oops too long');
      setSaveSuccess(false);
    } else {
      push(ref(db, 'poems/'), {
        poem: text,
        name: username,
        timestamp: serverTimestamp(),
      });
      setSaveSuccess(true);
      setMessage(`wow published! thanks ${username}`);
    }
  };

  return (
    <>
      <div id="space">
        <div className='composeMessage'>{message ? message : null}</div>

        {sendRequest && composedPoem.length != 0 && (
          <div className='save'>
            <input
              type='text'
              name='username'
              placeholder='your name here'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <button type='button' onClick={handleClick}>
              publish
            </button>
          </div>
        )}


        <DropTarget
          handleDrag={props.handleDrag}
          onHit={() => handleDrop(props.currentWord)}
        >

          <div ref={scrollRef} className={sendRequest ? 'sendRequest enter' : 'enter'}>
            {composedPoem.map((word, i) => {
              return <span key={word + i}>{word} </span>;
            })}
          </div>
        </DropTarget>

        <div className='footerButtons'>
          <div id="send" className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }>
            <button
            type='button'
            onClick={send}
          >
            </button>
          </div>
          <div id="share" className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }>
            <button
            type='button'
            onClick={share}
          >
            </button>
          </div>
          <div id="copy"  className={
              copySuccess || clearSuccess || composedPoem.length === 0
                ? 'disabled'
                : null
            }>
            <button 
            type='button'
            onClick={copy}
          >
          </button>
          </div>
          <div id="clear"  className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }>
            <button
            type='button'
            onClick={clear}
          >
          </button>
          </div>
          <div id="backspace"   className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }>
            <button 
            type='button'
            onClick={backspace}
          >
          </button>
          </div>
          <div id="newLine" className={clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }>
            <button 
            type='button'
            onClick={newLine}
          >
          </button>
          </div>
        </div>
      </div>
    </>
  );
};
