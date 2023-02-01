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
      <div id="space">
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
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAdlJREFUaEPt17FKA0EQBuB/LomxEFH7xGCstbBQjIVGsPQFBEV8A7HxDQQLX0BQsPANtLAwhafWFhHkLiQXkBSCYCMa4soVJ+EImttZ3T25NAfhZplvZnaXI8T8RzHPH98C8sWS+B0g3VuddLler7S462sC+GmrQWgEqEFoAxBwJ4Ap/9lOZZYfHypPMuOkDYA2jSEjLgDMcMZJG8BzbcrnF0a5CK0Af2S4CO0ALsIIAAdhDEAWYRRABmEcICrCSEAUhDZA1FvXv7Ebrj0djosNwE/cv/wSQNTWq3w/6YDKasqslXQgqFqvSshUNIjp99tbWQdiD+BUmxOrrAOcJDixCYBTPRWxyjrA3cT9njphdAJQMQacNZR1gJMEJzb2gKHsc7Zarb53FyFWHzQAjj3X3mQDuKdQeIx+OJVeBKwNwscRgBEI7Ho1ey9YQ6oDfwjokMBqo2af5SbnV0jQGQBLCFpr1q5OfYQUgLMRo8QKwnbTsQ+CmPFiaUcA+wBeLUK57ti3BgPEieder4fBuYnSIRG2ALTSArOmAm4GaHjJcc7fwoBCYXGwk2pfEjAHoGoq4Cvv7v3Wa7MngCibUubdXh3o/i+WHUgAMqMgG5OMkGzlVMX9+w58An7WbSTd4q+fAAAAAElFTkSuQmCC' />
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
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA45JREFUaEPtmUtoE1EUhv+TNG3EilZ0I51UOlFq3Rl8ZVQUF+rKqrQ+QN0puPWN6EYUX2sXrgQfKD5oF6IrLZpELcaVBK2Z1k4SBR9Ebam2dubIVGPHkLSZ5k5KIdmFnHPm/87jzr03hEn+oUmuH+IBVq+ukLTBnUS0D8DCvwl6xeCLCanyKtrbh0QmTShAbe3yma4q1wMAi3OKJOrAINZrWigtCkIkgMvnX/EUzEtGE8fAs4QaVgAYIiCEAfhkZTeAywWJItqlxUNXCrIdwygvgE9WuLgH0D3Dre9lwyAXV1wiYEMx8TQ1nFOrYwA6DUmp+POkKXqOvEqqgK6VAXJkwLEKMHDfoKE9zFXkgX6JgfWTqgLFiM3lW/IZKANkZaBcAdEtYTdeuQJ2MybavlwB0Rm1G69cAbsZE21froDojNqNV66A3YzZsDdPfi8JaCOiJ6Tzh/5pU5Puz1/Y6/XO0on9BrA8oUZO5Yrp2HmgAABT+C2d6XiqK9RZgH3ui458jsWfiUeVpBqGsSPZ/bRjvMIzfhNRgZAHvEVVIx+LFW/6lxrg0ewZP9dFo9FfVvGNjY2VvQM1m1zgjQxaBEbt8O+EJIFfMlFrdWW6NRaLDWZDlxJA1T2/lqZed3yxiqirD25honMA6seoiEqMQz1d4btWu1IBsGEYy/7v+Wa3JKfOEmi/nVZi4EJCDR/O3OyVCuCmpoa3WYVKcvCCXfEj/nROU0MmRElmgHWmButS+bdtbufKfPYbN99qyHBtSqhPWktRgReaGv53W20ObN9ATQyAXAwAGN3V3nSD4wAEnOhRwyczYiVZ2UrAjXx9X2gF/qxS1OI4gItozbt4qD0juE4OXmfQdjEAuOY4gMHu+cmux28zgn1ysBOgeZnv+XaZBe4Q3jgO8KPKM+1TrL1vBEDpBVAtCKDPcYChHz+nvn8f7XcI4LvjAG6D53Z3R3pGZkB5w8B8IRUgvHYcgMBre9TIQ0eGmHHVcQAmHEvEw6f/tZBfaQHjpphViJuF/clX6H4mEAh4Pn31mi8yf1EvMqCruiq9oOQApui6emUzE+4UA8DETYl4pG1CAEzhkqycJ+BAoZX7z474rBaPHBl1MzeuwPacXD5ZOQPgoD234Z3o0TG30/aCjt9aklc2EYzz+WbCEjnOxAfMtrE+bcJayCpieLC/TWkCeCOAgPVICSAKcOvs6QNt2UdRM8Zv5Ma7rsqhTWQAAAAASUVORK5CYII=' />
          </button>
          <button
            className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }
            type='button'
            onClick={clear}
          >
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAfVJREFUaEPtWDtOw0AQnVESqCkoYyTwKSCFO0oagkQiEXELOmg5RiIlSFEouEEKQpcbQKQYKVegyGeQsU2M47XX38HSbrmetd9782ZmE4SSLyw5flAEuDOYaQY0vfEARPehpJAezfe3u6yIZ0ZACryLOkMSkQS0kzPKSq0k7zE/JqEYFYEkqsY5ozIQRy2O2Mga4AAV55uKQBy18oiVzkDR8yCq+/zORFlVFAFZpZw4lQG/YMpC/9xCa0C8BaBzIGiHYiUcEW6eEbAHADVRbJE1sEbCm/nsdQDQrGj6oiskQTgyteo1jMcrTT+9BMKBiERhBJCwbYN3lmFUtc9lHwCufOoOzXqtbYF394+OGy1CsmJ3VmEEgHB0ePDVmk6nyy0KXyY8yntj6vqihwQtXgLW18NIbHDftY0seCuuuAxsUe1YBAyj+vPYYxtrT2CxP4ngICDIhBdXsxJmG28kDwGhnawH8uC5LGQLGFiwNoHQFuurZJ4MCMG76ORJcBAocRGH9fkN7kXOCe5BFtnnZYYdVw2U/yoBsEaCznw26Ue2Sk8mnMvcEwDYw44rA853V0jYIaSLgEucH9sQCV8IqSsCzzsHguRMsMfRRhPAFB9RBPzaqB/1MQ2mLKQsFNMyuQ+ylHhyOy7993puCFK+WBFIKWDq498Mv3JAiO5SZwAAAABJRU5ErkJggg==' />
          </button>
          <button
            className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }
            type='button'
            onClick={backspace}
          >
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAQVJREFUaEPtmUEOwiAQRYeLuPEYXsyddOnB7CnUBRcZIzGGVGxafoFM81134L//oMboxPjHGc8vBOhtkAZoAGxgP0focDwpWEbT8fC4xfK/BgjQtH8RGmhc+M92NEADYAN1j5CqF+c8mHF2vB6Aqg/Pcaj9vVIH4BP+XZ09gCS8PYBJeFsAmfB2AP6EX/P2Kb0r+CXeIDxiCgdweg338bym7dyz/QzEXxM4RF+AGYjSYEuN4kco3SljwhZAxoQ9gAmETYAEwi5AhHCDqF6WXsiS57a9xCUJwBkCgAXC4zQAVwguQANggfD4/gzAlXRaYD//0HQqEN6WBuAKwQVoACwQHjdv4AXLieExWLb62QAAAABJRU5ErkJggg==' />
          </button>
          <button
            className={
              clearSuccess || composedPoem.length === 0 ? 'disabled' : null
            }
            type='button'
            onClick={newLine}
          >
            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZhJREFUaEPtmbFKw0AYx/9fYsFBwcEiEQxugvgA0nboID6BPoGjg9BJJ+0oIvgiri5uYnwAHd1CSZ0EXQQpPQkkJRypl6t3idEva+5y3+/7/+4SCKHmF9W8fjBA1QlyAn82Ad9rC5Nw4TDItcWaQgwgxccJ6PrMCrFCus5I41khVsiyQvK5rlLu170HrAOoOvLDgMAASQenfsxxAgrHWCFWKE8Roj6EOFWeUIS3MAqW0nEby+3Fjwbev5un/R7Q3sRE/TC6Pys47zocBntpwWsrrS1y6Kk6gKT4uIACAK9j190eDO6eJwBeq0egy2oAMsUrAGJFbseue5ItHth3fS96BLBZPoBUvNL9nAG+1zkCxJVqrvk9YKL41c4OIG4g0KgZQHfO90aHIHFRpPgYznwC8VM1Umg2uwvzzuc6HOwS6EDlvJyIHYB4FSHOw5eH43TBAqeQypbc+/YAJIh6AmQg6guQ7IlCnxIzSGRXoRkK0p3CALodMz2eEzDdUd3n/b8EdDtU1Xhr/8jKAmKAsjo9bR1OoOoEvgBqixBAY6Q/lAAAAABJRU5ErkJggg==' />
          </button>
        </div>
      </div>
    </>
  );
};
