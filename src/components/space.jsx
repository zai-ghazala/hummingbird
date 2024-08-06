import React, { useState, useEffect, useRef } from 'react';
import { DropTarget } from 'react-drag-drop-container';

export const Space = (props) => {
  const [composedPoem, setComposedPoem] = useState([]);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [newLineSuccess, setNewLineSuccess] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);
  const [backspaceSuccess, setBackspaceSuccess] = useState(false);
  const [message, setMessage] = useState(null);
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
    setSaveFailure(false);
    setMessage(null);
  };

  useEffect(() => {
    setMessage('drag and drop your poem here');
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
        setMessage('copied to clipboard');
      }
    });
  };

  const clear = () => {
    if (composedPoem.length != 0) {
      setComposedPoem([]);
      setClearSuccess(true);
      setMessage('start over');
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
      setNewLineSuccess(true);
      setCopySuccess(false);
      setMessage('new line');
    }
  };

  const backspace = () => {
    if (composedPoem.length != 0) {
      const temp = [...composedPoem];
      temp.pop();
      setComposedPoem(temp);
      setBackspaceSuccess(true);
      setCopySuccess(false);
      setMessage('backspace');
    }
  };

  const share = () => {
      if (navigator.share) {
        let text = composedPoem.join(' ');

        text = text
          .replace(/\[object Object\] /g, '\n')
          .replace(/ \[object Object\] /g, '\n');

        navigator.share({
          text: text,
          url: 'https://www.hummingbird.suddenghazals.com',
        }).then(() => {
          setMessage('thanks for sharing')
          setShareSuccess(true);
        })
        .catch(console.erroor);
      } else {
        setMessage('sharing not supported')
      }
  };

  return (
    <>
      <div id="space">
        <div className='composeMessage'>{message ? message : null}</div>

        <DropTarget
          handleDrag={props.handleDrag}
          onHit={() => handleDrop(props.currentWord)}
        >

          <div ref={scrollRef} className="enter">
            {composedPoem.map((word, i) => {
              return <span key={word + i}>{word} </span>;
            })}
          </div>
        </DropTarget>

        <div className='footerButtons'>
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
