import React, { useState } from "react";
import { DropTarget, DragDropContainer } from "react-drag-drop-container";
import { Word } from "./word.jsx";

export const Space = props => {
  let currentWord = props.currentWord;
  
  const [words, setWords] = useState([]);


  const handleDrop = () => {
        setWords([...words, currentWord]);
    };
  
  
  
  return (
    <DropTarget targetKey="drag" onHit={handleDrop}>
      
      {words.map((word, i) => {
        return <Word key={"dropped_word" + i} word={word} />;
      })}
    </DropTarget>
  );
};





import React from 'react';
import { DragDropContainer, DropTarget } from '../../src';
import { Word } from './word';

export default class Space extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        words: []
      };
    }
  
    let currentWord = props.currentWord;
  
    handleDrop = (e) => {
      let words = this.state.words.slice();
      words.push({word: currentWord});
      this.setState({words: words});
    };
  
  
  
    render() {
      return (
       
              <DropTarget
                onHit={this.handleDrop}
                targetKey="drag"
              >
                <div className="box">
                  {this.state.words.map((word, i) => {
                    return (
                      <Word key={}"dropped_word" +}/>
                      <>
                    )
                  })}
                </div>
              </DropTarget>
            </DropTarget>
        </div>
      );
    }
  }