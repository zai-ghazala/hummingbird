import React, { useState, useEffect } from 'react';
import { DropTarget } from 'react-drag-drop-container';

import { ref, push, serverTimestamp } from 'firebase/database';
import { db } from '../utils/firebase';

export const Space = (props) => {
  const [composedPoem, setComposedPoem] = useState([]);
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
      setNewLineSuccess(true);
      setMessage('new line');
    }
  };

  const backspace = () => {
    if (composedPoem.length != 0) {
      const temp = [...composedPoem];
      temp.pop();
      setComposedPoem(temp);
      setBackspaceSuccess(true);
      setMessage('backspace');
    }
  };

  const send = () => {
    setSendRequest(true);
    setMessage('save and send?');
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
      <div id='space'>
        <div className='compose-message'>{message ? message : null}</div>

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
          <div className={sendRequest ? 'enter__send-request enter' : 'enter'}>
            {composedPoem.map((word, i) => {
              return <span key={word + i}>{word} </span>;
            })}
          </div>
        </DropTarget>
        <div className='footer-buttons'>
          <button
            className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }
            type='button'
            onClick={send}
          >
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABbUlEQVRoge2XMU7DMBSGPwpiAFEOAEXqDRADt6iYuAIrI2tHLsDAHZBaqeIQsDBwAipxAKjYqMJALDXpS5w4NraLP+ktcWz/n5MnJRAmY+DWdwhTxkCWV3QSq+Gjk5DCRyNRFz54iSbhg5VoEz44CZPwaxJbwsKZo8DSXhLl/Wvn9cyyhMNGCrw62mvX0bpr7ADXwALzJmtTZXTjjRkCjzELKEbAPCaBM+HaIXAHLGMQWAL3wEGF3LNjgc6ohd+BS2FcNfln6AKqZsCJcN8R8BCDQAZ8ATfAtnD/CHgzCF71hJ0IqHoBzoU5+/x+YH03CF7XY6fAk2Z+J4HVAH2DAFUHsNfiADoL6F6BHnBFscltvoLWBFRNgGNhnQEwzccHFeMTg/2sC+hOuIx6Qh+GezkR0L3jiiZN6lUgQ27yNk3qXUDVHLjIy+bHYIG//Ce2RSHzRv5SRkUS8E0S8E0S8E0S8E30AolEIpH43/wAK9D7iR1oK7gAAAAASUVORK5CYII=' />
          </button>
          <button
            className={
              copySuccess || clearSuccess || composedPoem.length === 0
                ? 'disabled'
                : null
            }
            type='button'
            onClick={copy}
          >
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAB5UlEQVRoge2YzU7CQBSFP1FYufF3IyyMxicwRp8CBH9WRn0bER+DGN2JMbhzw8Io6lYSwJXiA2BcgouWpJn+WqYz1fQkN+G209Nzyu2d6UCC/4cp4BhoAt9mPAJH5rlYYxZD7NAlHoAZbep8kMIQ6CZ+FPfm2NjhEH/xozhQISioGLe4AZaALFCXwKfcQNbClYvKQCxrURbGfWJ1jH8hB9xK4HPEhI+BOMFR658vocSAbiQGdCMxoBuJAd1IDOhGYkA34rBLMARegBrQAD6Bd/P4PLAKbIUljjIGwCWwFkacbgMdYCMq4VEbaACLUYuPysAdkHa4VwbYB86BFvBlRss8tmeO0WqgA8w53KcEdANeX9RlYIC95ieBsxBcFQK2f5kGLhz4w4gfRVmlgQH2VlnyGB9UR0GVgabAm8Go53ENvAEZFUuJayHfBlYk8C4DeRUGGkKel8idV7EW+hDydSH32h10Om8tM5HLNlBGTAu8fbxr3g/Wa/sqSmgQJbcKAwtC3pPI3VNhQOw4z0L+2zZqxZMKA5tCfiWRuyaRKzDSQJvxJ7IuIVaoslD0ECbCbZzM+SQUKoRvzSca9NqQAk75vfgyMdtNKeD9ToyiTQzKxg1pYBeoAq8Ys3Xf/F0FdnD+FOUHoSsGfdb7aIoAAAAASUVORK5CYII=' />
          </button>
          <button
            className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }
            type='button'
            onClick={clear}
          >
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABFklEQVRoge2YzYrCMBhFj2N9QzdW8Flm6YOMi6JP6A91MRFCMclnifkU7gE3cqH3JGkSCkKImvwCY+G3d2tXwFK+usTCkBlrPWwm2Y4/rVq8CwkIIXyxnAMPWp8Hpm5fvwtJwBsJeFNL4AbsgIMhewI2wKXSs82k7vZXoA+ZJfCXyR6BLmTXwDmTbSbQT3IdMDzJDVH5B/0nCByB1SQ7nYl45OPM4RMEShJzyjcXSC2RLvHfsyXmLpCaiRjLyLsK5CReKW8WeNdBlirg+oXDOvrTNR9TOif0Es8VyG2VlnPCVcCyz8+RaCbw9VeJK7ANmdJWGc/Emv8bqbvAGIr02F7OIWRz5c0C+irhjQS8kYA3EhBC+HIHm/kn2YWEOYQAAAAASUVORK5CYII=' />
          </button>
          <button
            className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }
            type='button'
            onClick={backspace}
          >
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAqUlEQVRoge3YwQqDQAxF0Vi68Yu7nC77ye7sVmRGqEnmEXoPCG6MuYIImgEA/tlyON9lW9yzmJk91Ft4EaBGgBoBalkB76S5l/agowXPGx0pAS143tSAFjxvasB5+VIBveXLBIyW/4UsIGJ5d4DnO7A6rk1x5yl8RPcNfYlHESVe4quIUgG9iHIB54iSAceIKQHPXonTy8y2hLld/BdSI0CNADUCAABQ+gLh+uj3RSFJRgAAAABJRU5ErkJggg==' />
          </button>
          <button
            className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }
            type='button'
            onClick={newLine}
          >
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAA8ElEQVRoge2YsQ3CMBBFPxA6GIOOMdgHKQ1t6BiGmk0YgyIdooHCDbIAna2zf4z+k1JEyvnu2Y6dGBBCCCazgm0/ndv7WOvcOUl1JMBGAmwkwEYCbDpi7nhnzdq5/3oEvL9litD8CEiAjQTYeAscjc+N0f3auQ4AYRlNuYaEuHOUa2uIKSowJMTdAGyiXD1TYDDGjQg9Hxe/AHBlCcTF57A35kqmRvE7AA9Drq8CrGW0Q+j5C4BlqSTeU2iFsNr0sM35ai/xKTNuMgKxRJMC7xJVBTx/KQ8A7o7tmfh1Op01bAXR6fQkkQCb5gWEEILLC+0C/yU8Q/xTAAAAAElFTkSuQmCC' />
          </button>
        </div>
      </div>
    </>
  );
};
